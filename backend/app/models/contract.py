import uuid
from datetime import datetime
from sqlalchemy import String, Float, ForeignKey, DateTime, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
import enum

from app.database.postgres import Base


class ContractStatus(str, enum.Enum):
    pending = "pending"
    active = "active"
    completed = "completed"
    cancelled = "cancelled"


class Contract(Base):
    __tablename__ = "contracts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("marketplace_listings.id"), nullable=False)
    seller_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    buyer_name: Mapped[str] = mapped_column(String(255), nullable=False)
    buyer_contact: Mapped[str | None] = mapped_column(String(255))
    quantity_tons: Mapped[float] = mapped_column(Float, nullable=False)
    price_per_ton_cfa: Mapped[float] = mapped_column(Float, nullable=False)
    status: Mapped[ContractStatus] = mapped_column(SAEnum(ContractStatus), default=ContractStatus.pending)
    payment_reference: Mapped[str | None] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
