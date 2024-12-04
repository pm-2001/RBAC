from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from models.user import Role 
from database.dbconnect import get_db

def create_role(role, db: Session):
    db_role = db.query(Role).filter(Role.name == role.name).first()
    if db_role:
        raise HTTPException(status_code=400, detail="Role already exists")
    
    new_role = Role(name=role.name, permissions=role.permissions) 
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    return {"message": "Role created successfully", "role": new_role.name, "permissions": new_role.permissions}
