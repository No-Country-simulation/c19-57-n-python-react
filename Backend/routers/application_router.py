from fastapi import APIRouter, HTTPException, Depends, Form, status
from sqlalchemy.orm import Session
from Backend.schemas.scheme_application import CreateApplicationBase
from Backend.config.data_base import get_db
from Backend.models.application_model import create_application as ApplicationModel
from typing import List
from datetime import datetime
from datetime import date
from sqlalchemy.exc import SQLAlchemyError
from typing import Optional 
from pydantic import BaseModel
import logging

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

# Función para eliminar una solicitud de adopción existente
@appli_root.delete("/pets/application/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(application_id: int, db: Session = Depends(get_db)):
    application = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first() # Busca la solicitud por ID
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found") # Lanza una excepción si no se encuentra la solicitud

    db.delete(application) # Elimina la solicitud de la sesión de la base de datos
    db.commit() # Guarda (commitea) los cambios en la base de datos
    return {"message": "Application deleted successfully"} # Retorna un mensaje de confirmación




























#PUT CON BUGG ERROR 500 
# Función para actualizar una solicitud de adopción existente
# @appli_root.put("/pets/application/{application_id}", response_model=CreateApplicationBase)
# def update_application(application_id: int, application: CreateApplicationBase, db: Session = Depends(get_db)):
#     db_application = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first() # Busca la solicitud por ID
#     if db_application is None:
#         raise HTTPException(status_code=404, detail="Application not found") # Lanza una excepción si no se encuentra la solicitud
    
#     for key, value in application.dict().items(): # Itera sobre los campos de la solicitud y actualiza los valores
#         setattr(db_application, key, value)

#     db.commit() # Guarda (commitea) los cambios en la base de datos
#     db.refresh(db_application) # Refresca la instancia de la solicitud para obtener los datos actualizados
#     return db_application # Retorna la solicitud actualizada

## DEBUGEANDO PUT 
# # solucion put 1
# class UpdateApplicationBase(BaseModel):
#     name: Optional[str]
#     last_name: Optional[str]
#     age: Optional[int]
#     genre: Optional[str]
#     email: Optional[str]
#     phone: Optional[int]
#     type_appli: Optional[str]
#     employm_situ: Optional[str]
#     type_of_house: Optional[str]
#     yard: Optional[str]
#     mt2_yard: Optional[int]
#     another_pet: Optional[str]
#     another_pet_desc: Optional[str]
#     status_appli: Optional[str]

#     class Config:
#         from_attributes = True

# logging.basicConfig(level=logging.ERROR)
# logger = logging.getLogger(__name__)

# @appli_root.put("/pets/application/{application_id}", response_model=CreateApplicationBase)
# def update_application(
#     application_id: int, 
#     application: UpdateApplicationBase, 
#     db: Session = Depends(get_db)
# ):
#     try:
#         db_application = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first() # Busca la solicitud por ID
#         if db_application is None:
#             raise HTTPException(status_code=404, detail="Application not found") # Lanza una excepción si no se encuentra la solicitud

#         for key, value in application.dict(exclude_unset=True).items(): # Itera sobre los campos de la solicitud y actualiza los valores
#             setattr(db_application, key, value)

#         db.commit() # Guarda (commitea) los cambios en la base de datos
#         db.refresh(db_application) # Refresca la instancia de la solicitud para obtener los datos actualizados
#         return db_application # Retorna la solicitud actualizada
    
#     except SQLAlchemyError as e:
#         db.rollback() # Deshacer cambios en caso de error
#         logger.error(f"Database error: {e}")
#         raise HTTPException(status_code=500, detail="An error occurred while updating the application")

#     except Exception as e:
#         db.rollback() # Deshacer cambios en caso de error
#         logger.error(f"Unexpected error: {e}")
#         raise HTTPException(status_code=500, detail="An unexpected error occurred")

   
#   solucion 2
# @appli_root.put("/pets/application/{application_id}", response_model=CreateApplicationBase)
# def update_application(application_id: int, application: CreateApplicationBase, db: Session = Depends(get_db)):
#     try:
#         db_application = db.query(ApplicationModel).filter(ApplicationModel.id == application_id).first()
#         if db_application is None:
#             raise HTTPException(status_code=404, detail="Application not found")
        
#         # Actualiza solo los campos proporcionados en la solicitud
#         update_data = application.model_dump(exclude_unset=True)
#         for key, value in update_data.items():
#             setattr(db_application, key, value)

#         db.commit()
#         db.refresh(db_application)
#         return db_application

#     except SQLAlchemyError as e:
#         db.rollback()
#         print(f"Database error in update_application: {str(e)}")
#         raise HTTPException(status_code=500, detail="An error occurred while updating the application")

#     except Exception as e:
#         print(f"Unexpected error in update_application: {str(e)}")
#         raise HTTPException(status_code=500, detail="An unexpected error occurred")



