"""Database connection placeholder.

In real implementation this would:
- Initialize async engine (SQLAlchemy) for PostgreSQL
- Provide session dependency for FastAPI routes
- Handle migrations (Alembic)

For now we expose a fake dependency.
"""
from typing import Generator

def get_db() -> Generator[None, None, None]:
    """Fake DB session dependency."""
    yield None
