from pydantic import BaseModel, Field
from typing import Optional
#Creacion de modelos para methods (POST, GET, PUT, DELETE)


class create_user(BaseModel): #Modelo POST
    id: Optional[int]
    name: str
    surname: str
    year: int
    phone: str
    email:str
    password: str
    rol: str 
    