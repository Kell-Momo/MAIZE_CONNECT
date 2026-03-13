from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database.postgres import get_db
from app.database.mongodb import get_mongo
from app.services.auth_service import verify_firebase_token
from app.models.user import User

bearer_scheme = HTTPBearer()


async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(bearer_scheme)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    """
    Verifies the Firebase Bearer token and returns the corresponding User record.
    Creates the user in PostgreSQL on first login.
    """
    token = credentials.credentials
    decoded = await verify_firebase_token(token)
    if not decoded:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    firebase_uid = decoded["uid"]
    result = await db.execute(select(User).where(User.firebase_uid == firebase_uid))
    user = result.scalar_one_or_none()

    if not user:
        # First login — create a minimal profile
        user = User(
            firebase_uid=firebase_uid,
            email=decoded.get("email"),
            full_name=decoded.get("name"),
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    return user
