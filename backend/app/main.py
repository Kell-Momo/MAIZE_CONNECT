from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database.postgres import init_db, close_db
from app.database.mongodb import init_mongo, close_mongo

from app.routers import (
    auth,
    users,
    seeds,
    planting,
    growth,
    disease,
    harvest,
    storage,
    marketplace,
    notifications,
    weather,
)

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    await init_mongo()
    yield
    # Shutdown
    await close_db()
    await close_mongo()


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    # ── CORS ──────────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Routers ───────────────────────────────────────────────
    prefix = "/api/v1"
    app.include_router(auth.router, prefix=prefix, tags=["Auth"])
    app.include_router(users.router, prefix=prefix, tags=["Users"])
    app.include_router(seeds.router, prefix=prefix, tags=["Seeds"])
    app.include_router(planting.router, prefix=prefix, tags=["Planting"])
    app.include_router(growth.router, prefix=prefix, tags=["Growth"])
    app.include_router(disease.router, prefix=prefix, tags=["Disease"])
    app.include_router(harvest.router, prefix=prefix, tags=["Harvest"])
    app.include_router(storage.router, prefix=prefix, tags=["Storage"])
    app.include_router(marketplace.router, prefix=prefix, tags=["Marketplace"])
    app.include_router(notifications.router, prefix=prefix, tags=["Notifications"])
    app.include_router(weather.router, prefix=prefix, tags=["Weather"])

    # ── Health check ──────────────────────────────────────────
    @app.get("/health", tags=["Health"])
    async def health():
        return {"status": "ok", "version": settings.APP_VERSION}

    return app


app = create_app()
