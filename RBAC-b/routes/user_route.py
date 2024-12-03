from views.user import create_user
from fastapi import FastAPI, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from models.user import User, Role
from pydantic import BaseModel
from database.dbconnect import get_db

router = APIRouter()

class UserCreate(BaseModel):
    username: str
    email: str
    role: str

@router.post("/")
def userrole(userdata: UserCreate,db: Session = Depends(get_db)):
    return create_user(userdata)