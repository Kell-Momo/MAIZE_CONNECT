"""Shared package init — re-exports database helpers."""
from app.database.postgres import get_db, Base, init_db, close_db
from app.database.mongodb import get_mongo, init_mongo, close_mongo

__all__ = ["get_db", "Base", "init_db", "close_db", "get_mongo", "init_mongo", "close_mongo"]
