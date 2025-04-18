from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path

router = APIRouter(prefix="/download", tags=["download"])

RESULT_DIR = Path("results")

@router.get("/{result_id}")
async def download_file(result_id: str):
    """Serve the processed Excel file by result ID."""
    file_path = RESULT_DIR / f"{result_id}.xlsx"
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Result not found")
    return FileResponse(
        path=str(file_path),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename=file_path.name
    )
