import pandas as pd
import pytest
from fastapi.testclient import TestClient
from io import BytesIO
from app.main import app

client = TestClient(app)

@pytest.fixture(autouse=True)
def cleanup_dirs(tmp_path, monkeypatch):
    # Redirect uploads and results to temp dir
    monkeypatch.setenv("UPLOAD_DIR", str(tmp_path / "uploads"))
    monkeypatch.setenv("RESULT_DIR", str(tmp_path / "results"))
    # Ensure directories exist
    (tmp_path / "uploads").mkdir()
    (tmp_path / "results").mkdir()
    yield

def test_full_flow():
    # Prepare sample excel
    df = pd.DataFrame({"A": ["apple", "banana"], "B": ["apple", "banana"]})
    buf = BytesIO()
    df.to_excel(buf, index=False, engine="openpyxl")
    buf.seek(0)
    files = {"file": ("test.xlsx", buf, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")}

    # Upload
    resp = client.post("/upload/", files=files)
    assert resp.status_code == 200
    file_id = resp.json()["file_id"]

    # Process
    resp2 = client.post("/process/", json={"file_id": file_id})
    assert resp2.status_code == 200
    result_id = resp2.json()["result_id"]

    # Download
    resp3 = client.get(f"/download/{result_id}")
    assert resp3.status_code == 200
    assert resp3.headers["content-type"] == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

    # Verify content
    buf2 = BytesIO(resp3.content)
    df_out = pd.read_excel(buf2)
    assert "search" in df_out.columns and "match" in df_out.columns and "score" in df_out.columns
