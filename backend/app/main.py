from fastapi import FastAPI
from app.api.upload import router as upload_router
from app.api.process import router as process_router
from app.api.download import router as download_router

app = FastAPI()

app.include_router(upload_router)
app.include_router(process_router)
app.include_router(download_router)
