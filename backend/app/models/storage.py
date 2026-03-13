import uuid
from datetime import datetime
from sqlalchemy import String, Float, Boolean, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.database.postgres import Base


class StorageFacility(Base):
    __tablename__ = "storage_facilities"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)
    capacity_tons: Mapped[float] = mapped_column(Float)
    available_tons: Mapped[float] = mapped_column(Float)
    rate_cfa_per_ton_day: Mapped[float] = mapped_column(Float)
    has_drying: Mapped[bool] = mapped_column(Boolean, default=False)
    has_storage: Mapped[bool] = mapped_column(Boolean, default=False)
    rating: Mapped[float | None] = mapped_column(Float)
    contact_phone: Mapped[str | None] = mapped_column(String(30))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
