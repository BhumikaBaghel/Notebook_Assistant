
# Notebook LM Clone – Monorepo

An open-source clone of Notebook LM (Google's AI-powered notebook), enabling document upload, interactive notebooks, and AI-driven analysis and Q&A. This monorepo contains both backend (FastAPI, LangChain) and frontend (React, Vite) code.

---

## 🏗️ Architecture

- **Backend**: FastAPI, LangChain (planned), PostgreSQL, Vector DB (Chroma/Pinecone)
- **Frontend**: React, Vite, TypeScript
- **Monorepo**: Separate `backend/` and `frontend/` modules
- **AI/ML**: RAG-based Q&A, document summarization, cross-document analysis

---

## 📁 Repository Structure

```
Notebook_Assistant/
	backend/                  # FastAPI backend (Python 3.13, UV)
	frontend/
		notebook-assistant/     # React + Vite frontend
	PROJECT_ROADMAP.md        # Development phases and features
	README.md                 # (This file)
```

---

## 🚀 Quickstart

### 1. Backend Setup

See [`backend/README.md`](backend/README.md) for full details.

```sh
cd backend
uv install
python main.py
```

### 2. Frontend Setup

See [`frontend/notebook-assistant/README.md`](frontend/notebook-assistant/README.md) for full details.

```sh
cd frontend/notebook-assistant
npm install
npm run dev
```

---

## �️ Development Workflow

- **Phase-based**: Follow `PROJECT_ROADMAP.md` for current priorities
- **Feature Branches**: Use feature branches for new work
- **Modularity**: Keep code modular and document new modules/components

---

## 🔑 Critical Details

- **Python 3.13** required for backend (see `.python-version`)
- **UV** for Python dependency management (see backend README)
- **Node.js v18+** required for frontend
- **PostgreSQL** must be running for backend DB features
- **Vector DB** (Chroma/Pinecone) required for embeddings (planned)
- **API URLs**: Frontend expects backend at `http://localhost:8000` by default

---

## 🐞 Troubleshooting

- **Backend**:
	- Delete `.venv/` and re-run `uv install` if dependencies break
	- Ensure Python 3.13 is active (`python --version`)
	- Make sure PostgreSQL is running and accessible
	- Check port conflicts if FastAPI fails to start
- **Frontend**:
	- Delete `node_modules/` and `package-lock.json` if dependencies break
	- Use `.env` to override default ports or API URLs
	- Use Git Bash/WSL on Windows if you hit path/shell issues

---

## 🤝 Contributing

1. Read `PROJECT_ROADMAP.md` for current focus
2. Use feature branches and submit PRs
3. Document new features and modules

---

## 📚 References

- [FastAPI](https://fastapi.tiangolo.com/)
- [LangChain](https://python.langchain.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [UV](https://github.com/astral-sh/uv)

### Backend Setup
```bash
cd backend
uv install
uv run python main.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📋 Project Status

**Current Phase**: Phase 1 - Foundation & Core Backend
- ✅ Basic project structure
- 🔄 FastAPI application setup
- ⏳ Document upload system
- ⏳ Vector database integration
- ⏳ LangChain integration

## 🏗️ Architecture

- **Backend**: FastAPI + LangChain + PostgreSQL + Vector Database
- **Frontend**: React + TypeScript + Vite
- **AI/ML**: OpenAI GPT-4/Claude integration via LangChain
- **Storage**: Local filesystem with cloud options

## 📖 Documentation

- [`PROJECT_ROADMAP.md`](PROJECT_ROADMAP.md) - Complete development roadmap and feature specifications
- [`.github/copilot-instructions.md`](.github/copilot-instructions.md) - AI coding agent guidelines
- `backend/README.md` - Backend-specific documentation (to be created)
- `frontend/README.md` - Frontend-specific documentation (to be created)

## 🤝 Contributing

1. Review the [`PROJECT_ROADMAP.md`](PROJECT_ROADMAP.md) for current phase and tasks
2. Check [`.github/copilot-instructions.md`](.github/copilot-instructions.md) for coding guidelines
3. Pick up tasks from the current phase based on your expertise
4. Follow the established development workflow

## 📞 Team Coordination

- **Daily Standups**: Review progress against current phase milestones
- **Weekly Planning**: Plan next phase tasks and adjust timeline
- **Phase Reviews**: Demo completed features and plan next phase

## 🔗 Key Links

- [Roadmap](PROJECT_ROADMAP.md) - Complete project plan
- [API Docs](http://localhost:8000/docs) - Interactive API documentation (when running)
- [Design System](frontend/src/components) - UI component library (to be created)

---

**Next Steps**: Follow Phase 1 tasks in the roadmap to set up FastAPI application structure and document processing pipeline.