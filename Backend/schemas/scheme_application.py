from pydantic import BaseModel
from typing import Optional, List
from datetime import date


class create_application_base(BaseModel):
    id: Optional[int]
    create_at: Optional[date]
    name: str
    last_name: str
    age: int
    genre: str
    email: str
    phone: int
    type_appli: str
    employm_situ: str
    type_of_house: str
    income_range: str
    yard: str
    mt2_yard: Optional[int]
    another_pet: str
    another_pet_desc: Optional[str]
    status_appli: str
    id_mascota: int

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
    type_of_house: Optional[str]
    income_range: Optional[str]
    yard: Optional[str]
    mt2_yard: Optional[int]
    another_pet: Optional[str]
    another_pet_desc: Optional[str]
    status_appli: Optional[str]

    class Config:
        from_attributes = True