from datetime import date
from typing import Optional
from pydantic import BaseModel

class CreateApplicationBase(BaseModel):
    create_at: Optional[date]
    name: str
    last_name: str
    age: int
    genre: str
    email: str
    phone: int
    type_appli: str
    employm_situ: str
    income_range:str
    type_of_house: str
    yard: str
    mt2_yard: Optional[int]
    another_pet: str
    another_pet_desc: Optional[str]
    status_appli: str

    class Config:
        from_attributes = True

class UpdateApplicationBase(BaseModel):
    name: Optional[str]
    last_name: Optional[str]
    age: Optional[int]
    genre: Optional[str]
    email: Optional[str]
    phone: Optional[int]
    type_appli: Optional[str]
    employm_situ: Optional[str]
    income_range: Optional[str]
    type_of_house: Optional[str]
    yard: Optional[str]
    mt2_yard: Optional[int]
    another_pet: Optional[str]
    another_pet_desc: Optional[str]
    status_appli: Optional[str]

    class Config:
        from_attributes = True