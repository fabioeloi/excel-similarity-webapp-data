from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.domains.upload.file_storage import FileStorage
from app.domains.search.similarity_engine import SimilarityEngine
from pathlib import Path
import pandas as pd

router = APIRouter(prefix="/process", tags=["process"])

UPLOAD_DIR = Path("uploads")
RESULT_DIR = Path("results")
UPLOAD_DIR.mkdir(exist_ok=True)
RESULT_DIR.mkdir(exist_ok=True)

class ProcessRequest(BaseModel):
    file_id: str

@router.post("/")
async def process_file(request: ProcessRequest):
    file_path = UPLOAD_DIR / f"{request.file_id}.xlsx"
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    df = FileStorage.read(str(file_path))
    if df.shape[1] < 2:
        raise HTTPException(status_code=400, detail="Input file must have at least two columns")
    searches = df.iloc[:, 0].astype(str).tolist()
    candidates = df.iloc[:, 1].astype(str).tolist()
    engine = SimilarityEngine()
    engine.fit(candidates)
    results = engine.query(searches)
    res_df = pd.DataFrame(results)
    output_file_id = f"{request.file_id}_result"
    output_path = RESULT_DIR / f"{output_file_id}.xlsx"
    FileStorage.write(res_df, str(output_path))
    return {"result_id": output_file_id}
