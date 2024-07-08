from pydantic import BaseModel
from typing import Optional
#Creacion de modelos para methods (POST, GET, PUT, DELETE)


class crear_usuario(BaseModel): #Modelo POST
    id: Optional[int]
    name: str
    surname: str
    year: int
    phone: str
    email:str
    password: str
    
class obtener_usuario(BaseModel): #Modelo GET
    id: Optional[int]
    name: str
    surname: str
    year: int
    phone: str
    email:str
    password: str

class editar_usuario(BaseModel): #Modelo PUT
    name: str
    surname: str
    email:str
    
class eliminar_usuario(BaseModel): #Modelo DELETE
    id: Optional[int]
    name: str
    surname: str
    year: int
    phone: str
    email:str
    password: str