from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from Backend.schemas.scheme_animals import create_animal_base
from Backend.config.data_base import localsesion
from Backend.models import animals_model
from Backend.models.animals_model import create_animals
from Backend.config.data_base import engine


animals_model.base.metadata.create_all(bind=engine)
animal_root = APIRouter()


def get_db(): 
    db = localsesion()
    try:
        yield db
    finally:
        db.close

      
@animal_root.post("/pets/register", response_model=create_animal_base)
def register_pets(animal: create_animal_base,  db: Session = Depends(get_db)):
    insert_animal = create_animals(**animal.model_dump())
    db.add(insert_animal)
    db.commit()
    return animal

@animal_root.get("/pets")
def get_pets(animal: create_animal_base, db: Session = Depends(get_db)):
    pass