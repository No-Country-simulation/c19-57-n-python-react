from fastapi import APIRouter, HTTPException, Depends, Form, status
from sqlalchemy.orm import Session
from Backend.schemas.scheme_application import CreateApplicationBase
from Backend.config.data_base import get_db
from Backend.models.application_model import create_application as ApplicationModel
from typing import List
from datetime import datetime
from datetime import date

# Creación de un enrutador para las solicitudes de adopción
appli_root = APIRouter()

# Función para manejar la creación de nuevas solicitudes de adopción
@appli_root.post("/pets/application", status_code=status.HTTP_201_CREATED)
def create_application(
   
   post:CreateApplicationBase, 

    db: Session = Depends(get_db) # Sesión de la base de datos
):
    # Creación de una instancia del modelo de solicitud de adopción
    application = ApplicationModel(
        **post.model_dump()
    )
    db.add(application) # Agrega la nueva solicitud a la sesión de la base de datos
    db.commit() # Guarda (commitea) la nueva solicitud en la base de datos
    # db.refresh(application) # Refresca la instancia de la solicitud para obtener los datos actualizados
    return [] # Retorna la solicitud actualizada

# Función para obtener una lista de todas las solicitudes de adopción
@appli_root.get("/pets/applications", response_model=List[CreateApplicationBase])
def read_applications(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    applications = db.query(ApplicationModel).offset(skip).limit(limit).all() # Obtiene las solicitudes desde la base de datos con paginación
    return applications # Retorna la lista de solicitudes

# Función para obtener una solicitud de adopción específica por ID
@appli_root.get("/pets/application/{application_id}", response_model=CreateApplicationBase)
def read_application(application_id: int, db: Session = Depends(get_db)):
    application = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first() # Busca la solicitud por ID
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found") # Lanza una excepción si no se encuentra la solicitud
    return application # Retorna la solicitud encontrada

# Función para actualizar una solicitud de adopción existente
@appli_root.put("/pets/application/{application_id}", response_model=CreateApplicationBase)
def update_application(application_id: int, application: CreateApplicationBase, db: Session = Depends(get_db)):
    db_application = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first() # Busca la solicitud por ID
    if db_application is None:
        raise HTTPException(status_code=404, detail="Application not found") # Lanza una excepción si no se encuentra la solicitud
    
    for key, value in application.dict().items(): # Itera sobre los campos de la solicitud y actualiza los valores
        setattr(db_application, key, value)
    
    db.commit() # Guarda (commitea) los cambios en la base de datos
    db.refresh(db_application) # Refresca la instancia de la solicitud para obtener los datos actualizados
    return db_application # Retorna la solicitud actualizada

# Función para eliminar una solicitud de adopción existente
@appli_root.delete("/pets/application/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(application_id: int, db: Session = Depends(get_db)):
    application = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first() # Busca la solicitud por ID
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found") # Lanza una excepción si no se encuentra la solicitud

    db.delete(application) # Elimina la solicitud de la sesión de la base de datos
    db.commit() # Guarda (commitea) los cambios en la base de datos
    return {"message": "Application deleted successfully"} # Retorna un mensaje de confirmación
