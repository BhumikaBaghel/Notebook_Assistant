from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/notebooks", tags=["notebooks"])

class NotebookCell(BaseModel):
    id: str
    cell_type: str  # markdown|code|ai
    content: str
    outputs: Optional[List[str]] = None

class Notebook(BaseModel):
    id: str
    title: str
    documents: List[str] = []
    cells: List[NotebookCell] = []

class CreateNotebookRequest(BaseModel):
    title: str
    documents: Optional[List[str]] = None

class CreateNotebookResponse(BaseModel):
    notebook: Notebook

@router.post("/", response_model=CreateNotebookResponse)
async def create_notebook(req: CreateNotebookRequest):
    """Create a new notebook.

    Request Example:
    {"title": "Analysis", "documents": ["doc1", "doc2"]}

    Response Example:
    {"notebook": {"id": "nb_123", "title": "Analysis", "documents": ["doc1", "doc2"], "cells": []}}
    """
    nb = Notebook(id="nb_fake", title=req.title, documents=req.documents or [], cells=[])
    return CreateNotebookResponse(notebook=nb)
