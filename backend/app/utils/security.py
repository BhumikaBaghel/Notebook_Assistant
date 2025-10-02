"""Security utilities placeholder.

Future responsibilities:
- JWT token creation & verification
- Password hashing
- API key support for service-to-service calls
- Rate limiting integration hooks

Current: simple stub functions.
"""
from typing import Optional

def get_current_user(token: Optional[str] = None):  # pragma: no cover - placeholder
    return {"id": "user_fake", "token_provided": bool(token)}
