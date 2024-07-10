from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from Backend.schemas.scheme_user import create_user
from Backend.config.data_base import localsesion
from Backend.models import user_model
from Backend.models.user_model import create_user_model
from Backend.config.data_base import engine

user_model.base.metadata.create_all(bind=engine)
user_root = APIRouter()


def get_db(): 
    db = localsesion()
    try:
        yield db
    finally:
        db.close

@user_root.get("/users")
def get_user(user: create_user, db: Session = Depends(get_db)):
    pass
        
@user_root.get("/users/{id}")
def get_user_id(user: create_user, db: Session = Depends(get_db)):
    pass        

@user_root.put("/users/edit/{id}")
def edit_user(user: create_user, db: Session = Depends(get_db)):
    pass  

@user_root.delete("/users/delete/{id}")
def edit_user(user: create_user, db: Session = Depends(get_db)):
    pass  
      
@user_root.post("/register")
def register(user: create_user, db: Session = Depends(get_db)):
    pass   

@user_root.post("/login")
def login(user: create_user, db: Session = Depends(get_db)):
    pass   
                
    
