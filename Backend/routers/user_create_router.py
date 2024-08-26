
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
from pydantic import ValidationError
from jwt.exceptions import InvalidTokenError
import os
from dotenv import load_dotenv

# Loading environment variables
load_dotenv()


user_model.base.metadata.create_all(bind=engine)

user_root = APIRouter(tags=['Authentication'])


def get_db(): 
    db = localsesion()
    try:
        yield db
    finally:
        db.close()
        
        

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")



def get_user(username:str,db: Session):
    # print(db)
    user = db.query(create_user_model).filter(create_user_model.username == username).first()
    if user:
        return login_user(**user)
    
def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_byte_enc = plain_password.encode('utf-8')
    hashed_password_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_byte_enc, hashed_password_bytes)
   

def autenticate_user(username:str,password:str,db:Session):
    user = db.query(create_user_model).filter(create_user_model.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas!")
    if not verify_password(password, user.password):
        return False
    return user


def hash_password(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)
    return hashed_password.decode('utf-8')

@user_root.post("/register",status_code =status.HTTP_201_CREATED)
def register(user: user_in,  db: Session = Depends(get_db)) -> create_user:
    try:       
        verify_user = db.query(create_user_model).filter(create_user_model.email==user.email).first()
        if verify_user is None:
            insert_user = create_user_model(create_at=user.create_at, name=user.name, username=user.username, year=user.year, phone=user.phone,
            country=user.country, gender=user.gender, imgen_profile="default_profile.jpg", email=user.email, password=hash_password(user.password))
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


async def get_current_user(token:str = Depends(oauth2_scheme),db: Session = Depends(get_db)):
    
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
    user = db.query(create_user_model).filter(create_user_model.username == token_data.username).first()
    # user = db.query(models.User).filter(models.User.id == token.id).first()
    # user = get_user(username=token_data.username,Session = Depends(get_db))
    if user is None:
        raise credentials_exception
    return user


@user_root.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),db: Session = Depends(get_db)
) -> Token:
    user = autenticate_user(form_data.username, form_data.password,db)
    
    
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES )
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}

@user_root.get("/auth", status_code=status.HTTP_200_OK)
async def check_auth(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        user = await get_current_user(token, db)
        return {"message": "Token válido", "user": user.username}
    except HTTPException as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
            headers={"WWW-Authenticate": "Bearer"},
        )
