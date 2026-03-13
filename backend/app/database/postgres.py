from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

from app.config import get_settings

settings = get_settings()

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_pre_ping=True,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy ORM models."""
    pass


async def init_db():
    """Create all tables on startup (dev only — use Alembic in production)."""
    async with engine.begin() as conn:
        from app.models import user, farm, seed, listing, contract, storage, notification  # noqa: F401
        await conn.run_sync(Base.metadata.create_all)


async def close_db():
    await engine.dispose()


async def get_db() -> AsyncSession:
    """FastAPI dependency — yields a database session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
