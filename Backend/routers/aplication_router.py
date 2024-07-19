from fastapi import APIRouter, HTTPException, Depends, UploadFile, Form, File, Response, status
from sqlalchemy.orm import Session
from Backend.schemas.scheme_aplication import create_aplication_base
from Backend.config.data_base import localsesion
from Backend.models import aplication_model
from Backend.models.aplication_model import create_application
from Backend.config.data_base import engine
from typing import List
from datetime import datetime, date
from fastapi.responses import JSONResponse


aplication_model.metadata.create_all(bind=engine)
aplication_root = APIRouter()



def get_db():
    db = localsesion()
    try:
        yield db
    finally:
        db.close()
        
        
        


@aplication_root.post("/register")
def register(aplication:create_aplication_base,db:Session = Depends(get_db)):
    

    try:
        insert_aplication = create_application(
            create_at=datetime.now(),
            name=aplication.name,
            last_name=aplication.last_name,
            age=aplication.age,
            genre=aplication.genre,
            email=aplication.email,
            phone=aplication.phone,
            type_appli=aplication.type_appli,
            employm_situ=aplication.employm_situ,
            type_of_house=aplication.type_of_house,
            income_range=aplication.income_range,
            yard=aplication.yard,
            mt2_yard=aplication.mt2_yard,
            another_pet=aplication.another_pet,
            another_pet_desc=aplication.another_pet_desc,
            status_appli=aplication.status_appli
        )
        db.add(insert_aplication)
        db.commit()
        db.refresh(insert_aplication)
        return JSONResponse(content=aplication)
        
    except HTTPException(status_code=404, detail="Bad Request") as e:
        raise e 
    
    