from pydantic import BaseModel
from typing import Optional, List
#Creacion de modelos para methods (POST, GET, PUT, DELETE)


class create_animal_base(BaseModel): #Modelo POST
    id: Optional[int]
    create_at: str
    name: str 
    animal_type: str
    race: str
    year: int
    history: str
    gender: str
    size: int
    characteristics: str
    location: str
    status: int
