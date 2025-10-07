from fastapi import APIRouter, UploadFile, Depends
import uuid
from os import listdir

from app.utils.database import get_db
from app.utils.file_saver import save_file, uploads_dir

router = APIRouter(prefix="/documents", tags=["documents"])

@router.post("/upload", summary="Upload one or more documents")
async def upload_documents(file: UploadFile, db = Depends(get_db)):
  """
  Upload endpoint accepting multiple files.\n
  supported_formats = [".pdf", ".docx", ".txt", ".md", ".xlsx", ".csv"]
  """

  supported_formats = [".pdf", ".docx", ".txt", ".md", ".xlsx", ".csv"]

  file_id = str(uuid.uuid4())
  file_name = file.filename
  file_size = round(file.size / 1024**2, 2) if file.size else 0

  if not any(file.filename.endswith(ext) for ext in supported_formats):
    return {"error": "Unsupported file format."}
  
  if file_size > 30:
    return {"error": "File size exceeds the 30MB limit."}

  file_path = save_file(file, file_id)
  db_entry = {
    "file_id": file_id,
    "file_name": file_name,
    "file_size": file_size,
    "file_path": file_path
    }
  db.add(db_entry)
  db.commit()
  return db_entry

@router.get("/")
async def list_documents(db = Depends(get_db)):
    """List available documents."""
    return {"documents": listdir(uploads_dir)}