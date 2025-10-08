from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time

from contextlib import asynccontextmanager

# Routers
from app.api.routes.documents import router as documents_router
from app.api.routes.chat import router as chat_router
from app.api.routes.notebooks import router as notebooks_router
from app.core.langchain_components import get_langchain_manager

app = FastAPI(title="Notebook LM Clone API", version="0.1.0")

# CORS (adjust origins as needed later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple timing middleware (optimization hook placeholder)
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):  # pragma: no cover - simple example
    start = time.perf_counter()
    response = await call_next(request)
    process_time = (time.perf_counter() - start) * 1000
    response.headers["X-Process-Time-ms"] = f"{process_time:.2f}"
    return response

# Include routers
app.include_router(documents_router)
app.include_router(chat_router)
app.include_router(notebooks_router)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize LangChain manager lazily (optional trigger)
    get_langchain_manager()
    yield

app.router.lifespan_context = lifespan

@app.get("/", tags=["root"])
async def root():
    return {"message": "Notebook LM Clone Backend", "docs_url": "/docs"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)