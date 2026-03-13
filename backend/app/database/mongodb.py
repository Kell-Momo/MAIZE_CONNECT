from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config import get_settings

settings = get_settings()

_client: AsyncIOMotorClient | None = None
_db: AsyncIOMotorDatabase | None = None


async def init_mongo():
    global _client, _db
    _client = AsyncIOMotorClient(settings.MONGODB_URL)
    _db = _client[settings.MONGODB_DB]


async def close_mongo():
    if _client:
        _client.close()


def get_mongo() -> AsyncIOMotorDatabase:
    """FastAPI dependency — returns the MongoDB database instance."""
    if _db is None:
        raise RuntimeError("MongoDB not initialised. Call init_mongo() first.")
    return _db
