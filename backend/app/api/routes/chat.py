from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatMessage(BaseModel):
    role: str  # user|assistant|system
    content: str
    source_documents: Optional[List[str]] = None  # doc IDs used for answer context

class ChatRequest(BaseModel):
    chat_id: Optional[str] = None
    documents: Optional[List[str]] = None  # limit retrieval scope
    message: str
    stream: bool = False

class ChatResponse(BaseModel):
    chat_id: str
    messages: List[ChatMessage]
    answer: str
    citations: List[str] = []  # doc IDs

@router.post("/send", response_model=ChatResponse, summary="Send a message to chat")
async def send_message(req: ChatRequest):
    """Process a user message and return AI response.

    Request Example:
    {
      "chat_id": "chat_abc", "documents": ["doc1"], "message": "Summarize the intro", "stream": false
    }

    Response Example:
    {
      "chat_id": "chat_abc",
      "messages": [
        {"role": "user", "content": "Summarize the intro"},
        {"role": "assistant", "content": "The paper introduces...", "source_documents": ["doc1"]}
      ],
      "answer": "The paper introduces...",
      "citations": ["doc1"]
    }
    """
    return ChatResponse(
        chat_id=req.chat_id,
        messages=[
            ChatMessage(role="user", content=req.message),
            ChatMessage(role="assistant", content="(placeholder answer)", source_documents=req.documents or [])
        ],
        answer="(placeholder answer)",
        citations=req.documents or []
    )
