from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/disease")


@router.post("/detect")
async def detect_disease(
    payload: dict,
    current_user: User = Depends(get_current_user),
):
    """
    Accepts { image_url: str }.
    Runs EfficientDet inference and returns disease name, severity, confidence, and treatments.
    AI inference will be wired in Phase 6.
    """
    # TODO: call ai_service.run_disease_detection(payload["image_url"])
    return {
        "disease": "Maize Streak Virus (MSV)",
        "severity": "medium",
        "confidence": 87,
        "description": "Placeholder — AI not yet wired.",
        "treatments": [],
    }
