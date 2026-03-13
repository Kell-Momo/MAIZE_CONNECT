from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.postgres import get_db
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/users")


@router.get("/me")
async def get_profile(current_user: User = Depends(get_current_user)):
    """Get the authenticated farmer's profile."""
    return current_user


@router.put("/me")
async def update_profile(
    data: dict,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update profile fields (name, phone, region, language, fcm_token)."""
    for key, value in data.items():
        if hasattr(current_user, key):
            setattr(current_user, key, value)
    await db.commit()
    await db.refresh(current_user)
    return current_user
