from fastapi import APIRouter, HTTPException, Depends, Header
from typing import List, Annotated
from sqlalchemy.orm import Session
from Backend.schemas.scheme_user import create_user, login_user, User_in
from Backend.config.data_base import localsesion
from Backend.models import user_model
from Backend.models.user_model import create_user_model 
from Backend.config.data_base import engine
from Backend.JWT import w_token, validate_token
import bcrypt


user_model.base.metadata.create_all(bind=engine)
user_root = APIRouter()


def get_db(): 
    db = localsesion()
    try:
        yield db
    finally:
        db.close

      
@user_root.post("/register")
def register(user: User_in,  db: Session = Depends(get_db)) -> create_user:
    password_input = bytes(user.password, encoding="utf-8")
    password_hash = bcrypt.hashpw(password_input, bcrypt.gensalt(12))
    
    verify_user = db.query(create_user_model).filter(create_user_model.email==user.email).first()
    if verify_user is None:
        insert_user = create_user_model(create_at=user.create_at, name=user.name, surname=user.surname, year=user.year, phone=user.phone,
        country=user.country, gender=user.gender, imgen_profile="default_profile.jpg", email=user.email, password=password_hash)
        db.add(insert_user)
        db.commit()
        db.refresh(insert_user)
        return user
    raise HTTPException(status_code=401, detail="Ese usuario ya existe!")
            
  

@user_root.post("/login")
def login(user: login_user, db: Session = Depends(get_db)):
    users = db.query(create_user_model).all()
    for x in users:
        if user.email == x.email and bcrypt.checkpw(user.password.encode("utf-8"), str(x.password).encode("utf-8")):
            return w_token(user.model_dump())
    raise HTTPException(status_code=401, detail="Datos incorrectos")

@user_root.post("/token")
def verify_token(auth_token: str = Header(None)):
    return validate_token(auth_token, output=True)
    
                
    
