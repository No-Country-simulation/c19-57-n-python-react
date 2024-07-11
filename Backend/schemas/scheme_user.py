from pydantic import BaseModel
from fastapi import Form, UploadFile
from typing import Optional
#Creacion de modelos para methods (POST, GET, PUT, DELETE)


class create_user(BaseModel): #Modelo POST
    id: Optional[int]
    create_at: str
    name: str
    surname: str
    year: int
    phone: str
    country: str
    gender: str
    imgen_profile: Optional[str]
    email:str

class User_in(create_user): #Modelo POST
    password: str
    
 

class login_user(BaseModel):
    email: str
    password: str
        