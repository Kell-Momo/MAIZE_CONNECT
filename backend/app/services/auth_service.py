import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
from app.config import get_settings

settings = get_settings()

# Initialize Firebase Admin SDK once
if not firebase_admin._apps:
    cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
    firebase_admin.initialize_app(cred)


async def verify_firebase_token(token: str) -> dict | None:
    """
    Verifies a Firebase ID token and returns its decoded payload.
    Returns None if the token is invalid or expired.
    """
    try:
        decoded = firebase_auth.verify_id_token(token)
        return decoded
    except Exception:
        return None
