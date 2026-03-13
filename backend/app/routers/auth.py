from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/auth")


@router.post("/verify")
async def verify_token(current_user: User = Depends(get_current_user)):
    """Verify Firebase token and return (or create) user profile."""
    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "full_name": current_user.full_name,
    }
