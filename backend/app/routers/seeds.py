from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.postgres import get_db
from app.models.seed import Seed

router = APIRouter(prefix="/seeds")


@router.get("")
async def list_seeds(
    search: str | None = Query(None),
    region: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """List certified seed varieties with optional search and region filter."""
    query = select(Seed)
    if region:
        query = query.where(Seed.region == region)
    result = await db.execute(query)
    seeds = result.scalars().all()
    if search:
        s = search.lower()
        seeds = [sd for sd in seeds if s in sd.name.lower() or s in sd.supplier.lower()]
    return seeds


@router.post("")
async def create_seed(data: dict, db: AsyncSession = Depends(get_db)):
    """Create a new seed listing (admin/supplier only — auth to be added)."""
    seed = Seed(**data)
    db.add(seed)
    await db.commit()
    await db.refresh(seed)
    return seed
