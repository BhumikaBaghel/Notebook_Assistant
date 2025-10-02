# Notebook LM Clone - Backend

FastAPI backend with LangChain integration for document processing and AI-powered analysis.

## 🛠️ Tech Stack

- **Framework**: FastAPI with async support
- **AI/ML**: LangChain + OpenAI GPT-4/Claude
- **Database**: PostgreSQL (metadata) + Vector Database (embeddings)
- **Package Manager**: UV
- **Python Version**: 3.13

## 🚀 Setup

```bash
# Install dependencies
uv install

# Run development server
uv run python main.py

# Add new dependencies
uv add <package-name>
```

## 📁 Project Structure (Planned)

```
backend/
├── main.py                 # FastAPI application entry point
├── pyproject.toml         # Dependencies and project metadata
├── app/
│   ├── __init__.py
│   ├── api/               # API routes
│   │   ├── __init__.py
│   │   ├── documents.py   # Document upload/management
│   │   ├── chat.py        # Q&A and chat endpoints
│   │   └── notebooks.py   # Notebook management
│   ├── core/              # Core functionality
│   │   ├── __init__.py
│   │   ├── config.py      # Configuration management
│   │   ├── database.py    # Database connection
│   │   └── security.py    # Authentication (future)
│   ├── models/            # Database models
│   │   ├── __init__.py
│   │   ├── document.py    # Document models
│   │   └── conversation.py # Chat models
│   ├── services/          # Business logic
│   │   ├── __init__.py
│   │   ├── document_processor.py # Document processing
│   │   ├── embedding_service.py  # Vector embeddings
│   │   └── ai_service.py         # LangChain integration
│   └── utils/             # Utility functions
│       ├── __init__.py
│       └── file_utils.py
└── tests/                 # Test files
    ├── __init__.py
    ├── test_documents.py
    └── test_ai_service.py
```

## 🔧 Development

### Current Status
- ✅ Basic FastAPI setup
- ⏳ Application structure
- ⏳ Document upload endpoints
- ⏳ LangChain integration
- ⏳ Vector database setup

### Next Steps (Phase 1)
1. Create FastAPI application structure
2. Add document upload endpoints
3. Implement text extraction for PDF/DOCX/TXT
4. Set up vector database integration
5. Create basic CRUD operations

### Dependencies to Add
```bash
uv add langchain langchain-openai
uv add sqlalchemy alembic psycopg2-binary
uv add chromadb  # or pinecone-client
uv add python-multipart  # for file uploads
uv add pydantic-settings
```

## 📊 API Endpoints (Planned)

- `GET /health` - Health check
- `POST /documents/upload` - Upload documents
- `GET /documents/` - List documents
- `POST /chat/` - Q&A over documents
- `GET /documents/{id}/summary` - Document summary
- `POST /notebooks/` - Create notebook
- `GET /notebooks/{id}` - Get notebook content

## 🧪 Testing

```bash
# Run tests
uv run pytest

# Run with coverage
uv run pytest --cov=app
```

## 🔗 Related

- [Project Roadmap](../PROJECT_ROADMAP.md)
- [Frontend Documentation](../frontend/README.md) (to be created)
- [API Documentation](http://localhost:8000/docs) (when running)