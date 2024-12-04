
from fastapi import FastAPI, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from models.user import Role
from pydantic import BaseModel
from views.role import create_role
from database.dbconnect import get_db
from typing import List
router = APIRouter()

class RoleCreate(BaseModel):
    name: str
    permissions: List[str]

@router.post("/")
def role(roledata: RoleCreate,db: Session = Depends(get_db)):
    return create_role(roledata,db)


@router.get("/")
def get_roles(db: Session = Depends(get_db)):
    roles = db.query(Role).all()
    return roles

@router.put("/{role_id}")
def update_role(role_id: int, role: RoleCreate, db: Session = Depends(get_db)):
    print(role)
    db_role = db.query(Role).filter(Role.id == role_id).first()
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")
    db_role.name = role.name
    db_role.permissions = role.permissions
    db.commit()
    db.refresh(db_role)
    return {"message": "Role updated successfully", "role": db_role.name, "permissions": db_role.permissions}

@router.delete("/{role_id}")
def delete_role(role_id: int, db: Session = Depends(get_db)):
    db_role = db.query(Role).filter(Role.id == role_id).first()
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")
    db.delete(db_role)
    db.commit()
    return {"message": "Role deleted successfully", "role": db_role.name}