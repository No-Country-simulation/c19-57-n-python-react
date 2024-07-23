from fastapi import APIRouter, HTTPException, Depends, UploadFile, Form, File, Response, status
from sqlalchemy.orm import Session
from Backend.schemas.scheme_animals import create_animal_base
from Backend.config.data_base import localsesion
from Backend.models import animals_model
from Backend.models.animals_model import create_animals
from Backend.config.data_base import engine
from typing import List
from datetime import datetime, date
from fastapi.responses import JSONResponse
from fastapi import status
from Backend.routers.user_create_router import get_current_user
from Backend.schemas.scheme_user import create_user
from typing import Annotated

animals_model.base.metadata.create_all(bind=engine)
animal_root = APIRouter()


def get_db(): 
    db = localsesion()
    try:
        yield db
    finally:
        db.close

now = datetime.now()  


#Obtiene datos desde formulario
@animal_root.post("/pets/register", status_code=status.HTTP_201_CREATED) 
async def register_pets(
        current_user: Annotated[create_user, Depends(get_current_user)],
        response: Response,
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
        IMEGEN_DIR = "imagenes/perfil/" 
        IMEGEN_DIR2 = "imagenes/details/"
        
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
            return Response(content=insert_animal.json(), media_type="application/json")
            # return {"message":"datos cargados"}
        else:
            raise HTTPException(status_code=401, detail="Extension no permitida")
        
    except HTTPException(status_code=400, detail="Bad Request") as e:
        raise e       


@animal_root.get("/pets/{id}",status_code=status.HTTP_200_OK)
def get_pets_id(id: int,current_user: Annotated[create_user, Depends(get_current_user)],response: Response ,db: Session = Depends(get_db)):
    try:
        get_data_animal = db.query(create_animals).filter(create_animals.id == id).first()
        if get_data_animal is None:
            return {"message":"ID no se encuentra registrada"}
        else:
            response.headers["Authorization"] = f"{current_user}"
            return JSONResponse(content=get_data_animal)
    
    except HTTPException(status_code=404, detail="Not found") as e:
        raise e 

@animal_root.get("/pets/all/",status_code= status.HTTP_200_OK)
def get_pets_all(current_user: Annotated[create_user, Depends(get_current_user)],response:Response,db: Session = Depends(get_db)):
    try:
        get_data_animal = db.query(create_animals).all()
        response.headers["Authorization"] = f"{current_user}"
        return JSONResponse(content=get_data_animal)
    
    except HTTPException(status_code=404, detail="Not found") as e:
        raise e 

@animal_root.put("/pets/editing/{id}",status_code = status. HTTP_204_NO_CONTENT)
def put_pets_id(id: int, animal: create_animal_base,current_user: Annotated[create_user, Depends(get_current_user)],response:Response,db: Session = Depends(get_db)):
    
    try:
        get_data_animal = db.query(create_animals).filter(create_animals.id == id).first()
        if get_data_animal is None:
            return {"message":"ID no se encuentra registrada"}
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
            return {"message":"Datos actualizados!"}
        
    except HTTPException(status_code=409, detail="Conflict") as e:
        raise e       

