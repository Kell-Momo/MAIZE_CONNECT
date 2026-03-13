from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/planting")


@router.post("/analyze")
async def analyze_planting(
    payload: dict,
    current_user: User = Depends(get_current_user),
):
    """
    Accepts { image_url: str } pointing to an S3 image.
    Runs MobileNet-based planting analysis and returns scores.
    AI inference will be wired in Phase 6 (ai_service).
    """
    # TODO: call ai_service.run_planting_analysis(payload["image_url"])
    return {
        "spacing": {"score": 78, "label": "Good", "feedback": "Placeholder — AI not yet wired."},
        "density": {"score": 85, "label": "Excellent", "feedback": "Placeholder."},
        "alignment": {"score": 62, "label": "Needs Improvement", "feedback": "Placeholder."},
    }
