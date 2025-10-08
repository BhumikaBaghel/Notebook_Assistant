from fastapi import APIRouter

router = APIRouter(tags=["health"])

@router.get("/", summary="Health check", response_model=dict)
async def health() -> dict:
    """Simple health endpoint."""
    return {"status": "ok", "service": "notebook-backend"}
