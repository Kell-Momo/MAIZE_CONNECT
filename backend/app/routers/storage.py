from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from math import radians, sin, cos, sqrt, atan2
from app.database.postgres import get_db
from app.models.storage import StorageFacility
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/storage")


def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Return distance in km between two GPS coordinates."""
    R = 6371
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    return R * 2 * atan2(sqrt(a), sqrt(1 - a))


@router.get("/nearby")
async def get_nearby_facilities(
    lat: float = Query(...),
    lon: float = Query(...),
    db: AsyncSession = Depends(get_db),
):
    """Returns storage/drying facilities sorted by distance from the given GPS coordinates."""
    result = await db.execute(select(StorageFacility))
    facilities = result.scalars().all()
    for f in facilities:
        f.distance_km = round(haversine(lat, lon, f.latitude, f.longitude), 1)
    return sorted(facilities, key=lambda f: f.distance_km)


@router.post("/book")
async def book_facility(
    payload: dict,
    current_user: User = Depends(get_current_user),
):
    """Book a storage facility slot."""
    # TODO: create a Booking record and reduce available_tons
    return {"status": "booked", "facility_id": payload.get("facility_id")}
