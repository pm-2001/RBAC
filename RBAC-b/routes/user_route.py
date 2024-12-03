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

class UserUpdate(BaseModel):
    status: bool

@router.post("/")
def userrole(userdata: UserCreate,db: Session = Depends(get_db)):
    return create_user(userdata,db)

@router.get("/")
def get_users(db: Session = Depends(get_db)):
    users_with_roles = (
        db.query(User, Role.name.label("role_name"))
        .join(Role, User.role_id == Role.id, isouter=True)  # Left join to include users without roles
        .all()
    )

    # Format the response to return combined data
    result = [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "status": user.status,
            "role": role_name,
        }
        for user, role_name in users_with_roles
    ]
    return result


@router.put("/{user_id}")
def toggle_user_status(user_id: int, status_update: UserUpdate, db: Session = Depends(get_db)):
    # Fetch the user from the database
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update the status field
    user.status = status_update.status
    db.commit()
    db.refresh(user)
    
    return {"message": "User status updated successfully", "user": {"id": user.id, "status": user.status}}