import uuid
from datetime import datetime
from sqlalchemy import String, Float, Boolean, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
import enum

from app.database.postgres import Base


class QualityGrade(str, enum.Enum):
    Aplus = "A+"
    A = "A"
    Aminus = "A-"
    Bplus = "B+"
    B = "B"


class MarketplaceListing(Base):
    __tablename__ = "marketplace_listings"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    seller_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    variety: Mapped[str] = mapped_column(String(150), nullable=False)
    quantity_tons: Mapped[float] = mapped_column(Float, nullable=False)
    price_per_ton_cfa: Mapped[float] = mapped_column(Float, nullable=False)
    location: Mapped[str | None] = mapped_column(String(150))
    grade: Mapped[QualityGrade | None] = mapped_column(SAEnum(QualityGrade))
    certified: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
