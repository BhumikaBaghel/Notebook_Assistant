from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from typing import List, Optional
import uuid

router = APIRouter(prefix="/documents", tags=["documents"])

class DocumentMetadata(BaseModel):
    id: str
    filename: str
    content_type: Optional[str] = None
    size_bytes: Optional[int] = None
    status: str = "uploaded"  # uploaded|processing|ready|error

class DocumentUploadResponse(BaseModel):
    documents: List[DocumentMetadata]
    message: str = "Upload received"

class DocumentListResponse(BaseModel):
    documents: List[DocumentMetadata]

@router.post("/upload", response_model=DocumentUploadResponse, summary="Upload one or more documents")
async def upload_documents(files: List[UploadFile] = File(...), collection: Optional[str] = Form(None)):
    """Upload endpoint accepting multiple files.

    Request: multipart/form-data with one or more `files` and optional `collection` name.
    Response JSON Example:
    {
      "documents": [
        {"id": "doc_123", "filename": "paper.pdf", "content_type": "application/pdf", "size_bytes": 18273, "status": "uploaded"}
      ],
      "message": "Upload received"
    }
    """
    metas = []
    for f in files:
        metas.append(DocumentMetadata(
            id=str(uuid.uuid4()),
            filename=f.filename,
            content_type=f.content_type,
            size_bytes=0,
            status="uploaded"
        ))
    return DocumentUploadResponse(documents=metas)

@router.get("/", response_model=DocumentListResponse)
async def list_documents():
    """List available documents.

    Response Example:
    {
      "documents": [
        {"id": "uuid", "filename": "report.pdf", "status": "ready"}
      ]
    }
    """
    return DocumentListResponse(documents=[DocumentMetadata(id="fake_report.pdf", filename="report.pdf", status="ready")])
