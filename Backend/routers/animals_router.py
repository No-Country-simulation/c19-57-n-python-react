from fastapi import APIRouter, HTTPException, Depends, UploadFile, Form, File, Response, status
from sqlalchemy.orm import Session
from Backend.schemas.scheme_animals import create_animal_base
from Backend.config.data_base import localsesion
from Backend.models import animals_model
from Backend.models.animals_model import create_animals
from Backend.config.data_base import engine
from typing import List
from datetime import datetime
from Backend.routers.user_create_router import get_current_user
from traceback import print_exception
import os
from dotenv import load_dotenv

load_dotenv()

animals_model.base.metadata.create_all(bind=engine)
animal_root = APIRouter()


def get_db(): 
    db = localsesion()
    try:
        yield db
    finally:
        db.close()

now = datetime.now()  

@animal_root.post("/pets/register", status_code=status.HTTP_201_CREATED,response_model=create_animal_base) 
async def register_pets(
        response: Response,
        current_user:str = Depends(get_current_user),
        create_at: str = now.strftime("%m-%d-%Y"),
        name: str = Form(...),
        animal_type: str = Form(...),
        race: str = Form(...),
        year: int = Form(...),
        history: str = Form(...),
        gender: str = Form(...),
        size: int = Form(...), 
        characteristics: str = Form(...),
        location: str = Form(...),
        status: int = Form(...),
        imagen_profile: UploadFile = File(...),
        imagen_details: List[UploadFile] = File(...),
        db: Session = Depends(get_db),
    ):
    
    try:
        IMEGEN_DIR = os.getenv('IMEGEN_DIR')
        IMEGEN_DIR2 = os.getenv('IMEGEN_DIR2')
        print(IMEGEN_DIR)
        print(IMEGEN_DIR2)
        
        get_img_profile = imagen_profile.filename 
    
        extension_img_profile = get_img_profile.split(".")[1] 
        
        lister = [] #
        
        for data in imagen_details:
            lister.append(data.filename)
        
        if extension_img_profile == "png" or extension_img_profile == "jpeg" or extension_img_profile == "jpg":
            
            insert_animal = create_animals(create_at= create_at, name=name, animal_type=animal_type,
            race=race, year=year, history=history, gender=gender, size=size, characteristics=characteristics, location=location,
            status=status, imagen_profile=get_img_profile, imagen_details=",".join(lister))
            
            content_img_profile = await imagen_profile.read()
            
            for data in imagen_details:
                img_name = data.filename
                read_image = await data.read()
                
                with open(f"{IMEGEN_DIR2}{img_name}", "wb") as f:
                    f.write(read_image)
                    
            with open(f"{IMEGEN_DIR}{get_img_profile}", "wb") as f:
                f.write(content_img_profile)

            db.add(insert_animal)
            db.commit()
            response.headers["Authorization"]= f"{current_user}"
            return insert_animal
        else:
            raise HTTPException(status_code=401, detail="Extension not allowed")
        
    except Exception as e:
        print_exception(e)
        return Response("Internal server error", status_code=500)       


@animal_root.get("/pets/{id}",status_code=status.HTTP_200_OK,response_model=create_animal_base)
def get_pets_id(id: int,response: Response,db: Session = Depends(get_db)):
    try:
        get_data_animal = db.query(create_animals).filter(create_animals.id == id).first()
        if get_data_animal is None:
            return {"message":"ID is not registered"}
        else:
            return get_data_animal
    
    except Exception as e:
        print_exception(e)
        return Response("Internal server error", status_code=500)       


@animal_root.get("/pets/all/",status_code= status.HTTP_200_OK)
def get_pets_all(response:Response,db: Session = Depends(get_db)):
    try:
        get_data_animal = db.query(create_animals).all()
        return get_data_animal

    except Exception as e:
        print_exception(e)
        return Response("Internal server error", status_code=500) 


@animal_root.put("/pets/editing/{id}",responses={204: {"model": None}},response_model=create_animal_base)
def put_pets_id(id: int, animal: create_animal_base,response:Response,current_user: str = Depends(get_current_user),db: Session = Depends(get_db)):
    
    try:
        get_data_animal = db.query(create_animals).filter(create_animals.id == id).first()
        if get_data_animal is None:
            return Response("ID is not registered",status_code=404)
        else:
            get_data_animal.name = animal.name
            get_data_animal.animal_type = animal.animal_type
            get_data_animal.race = animal.race
            get_data_animal.year = animal.year
            get_data_animal.history = animal.history
            get_data_animal.gender = animal.gender
            get_data_animal.size = animal.size
            get_data_animal.characteristics = animal.characteristics
            get_data_animal.location = animal.location
            get_data_animal.status = animal.status
            db.commit()
            response.headers["Authorization"] = f"{current_user}"
            return Response(status_code=status.HTTP_204_NO_CONTENT)
        
    except Exception as e:
        print_exception(e)
        return Response("Internal server error", status_code=500)   

@animal_root.delete("/pets/delete/{id}", status_code=status.HTTP_200_OK)
def delete_pets_id(id: int, response: Response, current_user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        animal = db.query(create_animals).filter(create_animals.id == id).first()
        
        if animal is None:
            raise HTTPException(status_code=404, detail="Pet not found")
        
        db.delete(animal)
        db.commit()

        response.headers["Authorization"] = f"{current_user}"
        
        return {"message": "Pet deleted successfully"}
    
    except Exception as e:
        print_exception(e)
        return Response("Internal server error", status_code=500)
