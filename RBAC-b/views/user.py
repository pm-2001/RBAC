from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from models.user import User, Role
from pydantic import BaseModel
from database.dbconnect import get_db


def create_user(user, db: Session):
    # Check if user already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    # Find or create the role
    db_role = db.query(Role).filter(Role.name == user.role).first()
    if not db_role:
        db_role = Role(name=user.role)
        db.add(db_role)
        db.commit()
        db.refresh(db_role)
    # Create the user
    new_user = User(
        username=user.username,
        email=user.email,
        role_id=db_role.id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "user": new_user.username}