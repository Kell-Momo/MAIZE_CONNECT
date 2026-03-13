from fastapi import APIRouter, Query
import httpx
from app.config import get_settings

settings = get_settings()
router = APIRouter(prefix="/weather")


@router.get("")
async def get_weather(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
):
    """Proxies a 5-day weather forecast from OpenWeatherMap."""
    url = f"{settings.OPENWEATHER_BASE_URL}/forecast"
    params = {
        "lat": lat,
        "lon": lon,
        "appid": settings.OPENWEATHER_API_KEY,
        "units": "metric",
        "cnt": 40,  # 5 days × 8 per day (3h intervals)
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params, timeout=10.0)
        response.raise_for_status()
        return response.json()
