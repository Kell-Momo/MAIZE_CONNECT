from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.postgres import get_db
from app.models.listing import MarketplaceListing
from app.models.contract import Contract
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/marketplace")


@router.get("/listings")
async def list_listings(
    search: str | None = Query(None),
    grade: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """Browse active marketplace listings."""
    query = select(MarketplaceListing).where(MarketplaceListing.is_active == True)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/listings")
async def create_listing(
    payload: dict,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a new marketplace listing for the authenticated farmer."""
    listing = MarketplaceListing(seller_id=current_user.id, **payload)
    db.add(listing)
    await db.commit()
    await db.refresh(listing)
    return listing


@router.get("/contracts")
async def list_contracts(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List contracts for the authenticated farmer."""
    result = await db.execute(select(Contract).where(Contract.seller_id == current_user.id))
    return result.scalars().all()


@router.post("/contracts")
async def create_contract(
    payload: dict,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a new sale contract."""
    contract = Contract(seller_id=current_user.id, **payload)
    db.add(contract)
    await db.commit()
    await db.refresh(contract)
    return contract
