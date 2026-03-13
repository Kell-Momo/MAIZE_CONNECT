import uuid
from datetime import datetime
from sqlalchemy import String, Float, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from app.database.postgres import Base


class Farm(Base):
    __tablename__ = "farms"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    region: Mapped[str | None] = mapped_column(String(100))
    total_area_ha: Mapped[float | None] = mapped_column(Float)
    latitude: Mapped[float | None] = mapped_column(Float)
    longitude: Mapped[float | None] = mapped_column(Float)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    plots: Mapped[list["Plot"]] = relationship("Plot", back_populates="farm")


class Plot(Base):
    __tablename__ = "plots"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    farm_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("farms.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    area_ha: Mapped[float | None] = mapped_column(Float)
    seed_variety: Mapped[str | None] = mapped_column(String(100))
    planting_date: Mapped[datetime | None] = mapped_column(DateTime)
    expected_harvest_date: Mapped[datetime | None] = mapped_column(DateTime)
    current_growth_stage: Mapped[str | None] = mapped_column(String(50))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    farm: Mapped["Farm"] = relationship("Farm", back_populates="plots")
