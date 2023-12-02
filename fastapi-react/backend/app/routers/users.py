from fastapi import APIRouter
from database import db

router = APIRouter()

@router.get("/users")
def get_users():
    print(db)
    return {"users": ["a", "b"]}
