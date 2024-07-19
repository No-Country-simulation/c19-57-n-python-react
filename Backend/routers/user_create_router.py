from typing import Annotated
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from Backend.schemas.scheme_user import create_user, login_user, user_in, Token, TokenData
from Backend.config.data_base import localsesion
from Backend.models import user_model
from Backend.models.user_model import create_user_model 
from Backend.config.data_base import engine
import bcrypt
from fastapi import status
from datetime import datetime, timedelta, timezone
import jwt
from passlib.context import CryptContext
from pydantic import ValidationError
from jwt.exceptions import InvalidTokenError


user_model.base.metadata.create_all(bind=engine)
user_root = APIRouter()

def get_db(): 
    db = localsesion()
    try:
        yield db
    finally:
        db.close()
        
        

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user(username:str,db:Session = Depends(get_db)):
    user = db.query(create_user_model).filter(create_user_model.username == username).first()
    if user:
        return login_user(**user)
    
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)    

def autenticate_user(username:str,password:str):
    user = get_user(username)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas!")
    if not verify_password(password, user.password):
        return False


@user_root.post("/register",status_code =status.HTTP_201_CREATED)
def register(user: user_in,  db: Session = Depends(get_db)) -> create_user:
    try:
        password_input = bytes(user.password, encoding="utf-8")
        password_hash = bcrypt.hashpw(password_input, bcrypt.gensalt(12))
        
        verify_user = db.query(create_user_model).filter(create_user_model.email==user.email).first()
        if verify_user is None:
            insert_user = create_user_model(create_at=user.create_at, name=user.name, username=user.username, year=user.year, phone=user.phone,
            country=user.country, gender=user.gender, imgen_profile="default_profile.jpg", email=user.email, password=password_hash)
            db.add(insert_user)
            db.commit()
            db.refresh(insert_user)
            # return user
            return insert_user
        raise HTTPException(status_code=401, detail="Ese usuario ya existe!")
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    
    credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except (InvalidTokenError, ValidationError):
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


@user_root.post("/login")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = autenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires,
    )
    return Token(access_token=access_token, token_type="bearer")


@user_root.get("/test/token")
def test(current_user: Annotated[create_user, Depends(get_current_user)]):
    return current_user