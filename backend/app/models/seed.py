import uuid
from datetime import datetime
from sqlalchemy import String, Float, Boolean, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.database.postgres import Base


class Seed(Base):
    __tablename__ = "seeds"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    variety_type: Mapped[str] = mapped_column(String(50))   # Yellow / White
    supplier: Mapped[str] = mapped_column(String(255), nullable=False)
    region: Mapped[str | None] = mapped_column(String(100))
    price_per_kg: Mapped[float] = mapped_column(Float, nullable=False)
    maturity_days: Mapped[int | None] = mapped_column(Integer)
    yield_min_t_ha: Mapped[float | None] = mapped_column(Float)
    yield_max_t_ha: Mapped[float | None] = mapped_column(Float)
    certified: Mapped[bool] = mapped_column(Boolean, default=False)
    rating: Mapped[float | None] = mapped_column(Float)
    contact_phone: Mapped[str | None] = mapped_column(String(30))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
