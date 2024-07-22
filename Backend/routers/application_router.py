from fastapi import APIRouter, HTTPException, Depends, Form, status
from sqlalchemy.orm import Session
from Backend.schemas.scheme_application import CreateApplicationBase
from Backend.config.data_base import get_db
from Backend.models.application_model import create_application as ApplicationModel
from typing import List
from sqlalchemy.exc import SQLAlchemyError


# Creación de un enrutador para las solicitudes de adopción
appli_root = APIRouter()

@appli_root.post("/pets/application", status_code=status.HTTP_201_CREATED)
def create_application(
    post: CreateApplicationBase,
    db: Session = Depends(get_db)
):
    try:
        print(f"Received data: {post.model_dump()}")  # Imprime los datos recibidos
        application = ApplicationModel(**post.model_dump())
        db.add(application)
        db.commit()
        db.refresh(application)
        return application
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Database error: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

# Función para obtener una solicitud de adopción específica por ID
@appli_root.get("/pets/application/{application_id}", response_model=CreateApplicationBase)
def read_application(application_id: int, db: Session = Depends(get_db)):
    application = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first() # Busca la solicitud por ID
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found") # Lanza una excepción si no se encuentra la solicitud
    return application # Retorna la solicitud encontrada

# Función para eliminar una solicitud de adopción existente
@appli_root.delete("/pets/application/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(application_id: int, db: Session = Depends(get_db)):
    application = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first() # Busca la solicitud por ID
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found") # Lanza una excepción si no se encuentra la solicitud

    db.delete(application) # Elimina la solicitud de la sesión de la base de datos
    db.commit() # Guarda (commitea) los cambios en la base de datos
    return {"message": "Application deleted successfully"} # Retorna un mensaje de confirmación




























