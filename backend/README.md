# Notebook LM Clone - Backend

FastAPI backend with LangChain integration for document processing and AI-powered analysis.


# Backend – Notebook LM Clone

This is the backend for the Notebook LM Clone project. It provides API endpoints for document upload, notebook management, and AI-powered analysis using FastAPI and (soon) LangChain.

---

## 🚀 Quickstart

1. **Python 3.13 Required**  
     Ensure you have Python 3.13 installed. (Check with `python --version`.)
2. **Install [UV](https://github.com/astral-sh/uv)**  
     UV is used for Python dependency management. Install it globally if you haven't:
     ```sh
     pip install uv
     ```
3. **Install dependencies**  
     In the `backend/` directory, run:
     ```sh
     uv install
     ```
4. **Run the FastAPI app**  
     ```sh
     python main.py
     ```

---

## 📁 Project Structure

```
backend/
    main.py                # FastAPI entrypoint
    pyproject.toml         # Python dependencies
    uv.lock                # Dependency lock file
    app/
        api/
            routes/            # API route modules
        core/                # Core logic (LangChain, etc.)
        utils/               # Utilities (DB, security)
```

---

## 🛠️ Development Notes

- **Virtual Environment**: Managed by UV in `.venv/` (auto-created).
- **Database**: PostgreSQL (for metadata) and a vector DB (Chroma/Pinecone) are planned. Ensure PostgreSQL is running for DB features.
- **AI/ML**: LangChain and OpenAI/Claude integration coming soon.
- **Roadmap**: See `PROJECT_ROADMAP.md` for phases and priorities.

---

## 🐞 Troubleshooting

- **Dependency Issues**:  
    - Delete `.venv/` and re-run `uv install` if you see import errors or missing packages.
    - Ensure you are using Python 3.13 (not 3.12 or lower).
- **Database Errors**:  
    - Make sure PostgreSQL is running and accessible (check credentials in your config).
    - If using a vector DB, ensure it is running and configured.
- **Port Conflicts**:  
    - If `main.py` fails to start, check if the port is already in use.
- **Windows Path Issues**:  
    - Use `python` (not `py`) to ensure the correct version is used.
    - If you see encoding errors, set your terminal to UTF-8.

---

## 💡 Useful Commands

```sh
cd backend
uv install
python main.py
```

---

## 🤝 Contributing

1. Follow the roadmap in `PROJECT_ROADMAP.md`.
2. Use feature branches for new work.
3. Keep code modular and document new modules.

---

## 📚 References

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [UV Docs](https://github.com/astral-sh/uv)
- [LangChain Docs](https://python.langchain.com/)
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