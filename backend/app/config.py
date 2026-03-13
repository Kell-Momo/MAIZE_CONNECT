from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # App
    APP_NAME: str = "MaizeConnect API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    ALLOWED_ORIGINS: list[str] = ["http://localhost:8080", "http://localhost:3000"]

    # PostgreSQL
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "maizeconnect"
    POSTGRES_USER: str = "maize_user"
    POSTGRES_PASSWORD: str = ""

    @property
    def DATABASE_URL(self) -> str:
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    # MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB: str = "maizeconnect_media"

    # Firebase
    FIREBASE_CREDENTIALS_PATH: str = "firebase_credentials.json"

    # AWS S3
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "eu-west-1"
    S3_BUCKET_NAME: str = "maizeconnect-images"

    # OpenWeatherMap
    OPENWEATHER_API_KEY: str = ""
    OPENWEATHER_BASE_URL: str = "https://api.openweathermap.org/data/2.5"

    # Google Maps
    GOOGLE_MAPS_API_KEY: str = ""

    # Moneero
    MONEERO_API_KEY: str = ""
    MONEERO_BASE_URL: str = "https://api.moneero.com/v1"

    # Firebase Cloud Messaging
    FCM_SERVER_KEY: str = ""

    # AI Model paths
    DISEASE_MODEL_PATH: str = "ai_models/disease_detection/model.tflite"
    PLANTING_MODEL_PATH: str = "ai_models/planting_analysis/model.tflite"
    GROWTH_MODEL_PATH: str = "ai_models/growth_staging/model.tflite"


@lru_cache
def get_settings() -> Settings:
    return Settings()
