# Notebook LM Clone - AI Coding Agent Instructions

## Project Overview
A comprehensive Notebook LM clone that allows users to upload documents, create interactive notebooks, and leverage AI for intelligent document analysis, summarization, and Q&A capabilities. The project is in early development phase with foundational setup.

## Architecture & Structure
- **Backend**: FastAPI + LangChain + PostgreSQL + Vector Database (`backend/`)
- **Frontend**: React + TypeScript + Vite (`frontend/` - to be implemented)
- **AI/ML**: LangChain integration with OpenAI/Claude for RAG-based document analysis
- **Monorepo**: Backend and frontend are separate modules in a single repository

## Technology Stack
- **Python**: 3.13 (specified in `backend/.python-version`)
- **Backend Framework**: FastAPI with LangChain integration
- **Frontend Framework**: React + TypeScript + Vite (planned)
- **Database**: PostgreSQL + Vector Database (Chroma/Pinecone)
- **AI/ML**: LangChain + OpenAI GPT-4/Claude
- **Package Management**: UV (Python), npm/yarn (Node.js)
- **File Storage**: Local filesystem or AWS S3

## Development Environment Setup
- Use Python 3.13 as specified in `.python-version`
- Backend uses UV for dependency management - run `uv install` in `backend/` directory
- Virtual environment is managed in `backend/.venv/`

## Key Files & Patterns
- `PROJECT_ROADMAP.md`: Comprehensive development roadmap with phases and features
- `backend/pyproject.toml`: Python dependencies including FastAPI and future LangChain integration
- `backend/main.py`: Currently minimal - will become FastAPI app with LangChain endpoints
- `backend/uv.lock`: Dependency lock file for reproducible builds
- `frontend/`: React + TypeScript application (to be created)

## Current State & Development Priorities
- **Phase 1**: Foundation & Core Backend (document upload, vector database, embeddings)
- **Backend**: Minimal FastAPI setup - needs document processing and LangChain integration
- **Frontend**: Empty directory - React + TypeScript + Vite setup needed
- **AI Features**: RAG-based Q&A, document summarization, cross-document analysis

## Working with this Codebase
When contributing to this project:
1. Follow the phase-based development approach outlined in `PROJECT_ROADMAP.md`
2. Backend: Focus on FastAPI + LangChain integration for document processing and AI features
3. Frontend: Implement React components for document upload, chat interface, and notebook editor
4. Database: Use PostgreSQL for metadata and vector database for embeddings
5. AI: Implement RAG patterns with proper citation tracking and source attribution

## Common Commands
```bash
# Backend development
cd backend
uv install                    # Install dependencies
uv add <package>             # Add new dependency
python main.py               # Run current minimal backend
```

## Project Conventions
- Separate backend/frontend directory structure
- Modern Python packaging with pyproject.toml
- UV package manager for Python dependencies
- Python 3.13 requirement suggests cutting-edge Python features may be used

## Development Workflow
- **Phase 1 (Weeks 1-3)**: Backend foundation, document upload, vector database setup
- **Phase 2 (Weeks 4-6)**: LangChain integration, RAG implementation, Q&A system
- **Phase 3 (Weeks 7-10)**: React frontend, document management UI, chat interface
- **Phase 4 (Weeks 11-13)**: Integration, testing, UX polish
- **Phase 5 (Weeks 14-16)**: Advanced features, deployment, production setup

## Immediate Next Steps
1. Set up FastAPI application structure with proper routing
2. Add LangChain, PostgreSQL, and vector database dependencies
3. Implement document upload and processing pipeline
4. Create database models for documents and conversations
5. Set up React + TypeScript + Vite frontend structure