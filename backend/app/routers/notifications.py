from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.postgres import get_db
from app.models.notification import Notification
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/notifications")


@router.get("")
async def list_notifications(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List all notifications for the authenticated farmer."""
    result = await db.execute(
        select(Notification)
        .where(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
    )
    return result.scalars().all()


@router.post("/{notification_id}/read")
async def mark_as_read(
    notification_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Mark a notification as read."""
    # TODO: fetch and update is_read flag
    return {"status": "ok"}
