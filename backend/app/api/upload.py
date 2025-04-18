import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path

router = APIRouter(prefix="/upload", tags=["upload"])

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    """Save uploaded Excel file and return a unique file ID."""
    if not file.filename.endswith(".xlsx"):
        raise HTTPException(status_code=400, detail="Only .xlsx files are supported")
    file_id = str(uuid.uuid4())
    file_path = UPLOAD_DIR / f"{file_id}.xlsx"
    content = await file.read()
    file_path.write_bytes(content)
    return {"file_id": file_id}
