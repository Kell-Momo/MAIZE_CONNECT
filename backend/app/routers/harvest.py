from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/harvest")


@router.get("/readiness")
async def get_harvest_readiness(current_user: User = Depends(get_current_user)):
    """Returns the harvest readiness percentage based on growth stage and moisture data."""
    # TODO: calculate from plot data
    return {
        "readiness_percent": 72,
        "moisture_percent": 22,
        "optimal_window_start": "2026-08-15",
        "optimal_window_end": "2026-08-24",
        "status": "Approaching Harvest Window",
    }
