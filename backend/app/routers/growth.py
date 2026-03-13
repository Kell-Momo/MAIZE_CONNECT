from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/growth")


@router.get("/timeline")
async def get_growth_timeline(current_user: User = Depends(get_current_user)):
    """Returns the growth stage history for the authenticated farmer's plots."""
    # TODO: query GrowthLog from MongoDB
    return {"stages": [], "message": "MongoDB query to be implemented in Phase 5."}


@router.post("/logs")
async def log_growth(
    payload: dict,
    current_user: User = Depends(get_current_user),
):
    """Save a new growth photo + stage entry to MongoDB."""
    # TODO: insert into MongoDB plant_images collection
    return {"status": "ok", "message": "Growth log to be stored in MongoDB."}
