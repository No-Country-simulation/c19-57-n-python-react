from fastapi import APIRouter, HTTPException, Depends, Form, status
from sqlalchemy.orm import Session
from Backend.schemas.scheme_application import CreateApplicationBase
from Backend.config.data_base import get_db
from Backend.models.application_model import create_application as ApplicationModel
from typing import List
from datetime import datetime

# Creación de un enrutador para las solicitudes de adopción
appli_root = APIRouter()

# Función para manejar la creación de nuevas solicitudes de adopción
@appli_root.post("/pets/application", response_model=CreateApplicationBase, status_code=status.HTTP_201_CREATED)
def create_application(
    create_at: str = Form(...), # Fecha de creación
    name: str = Form(...), # Nombre del solicitante
    last_name: str = Form(...), # Apellido del solicitante
    age: int = Form(...), # Edad del solicitante
    genre: str = Form(...), # Género del solicitante
    email: str = Form(...), # Email del solicitante
    phone: int = Form(...), # Teléfono del solicitante
    type_appli: str = Form(...), # Tipo de solicitud (Adopción, Acogida)
    employm_situ: str = Form(...), # Situación laboral del solicitante
    type_of_house: str = Form(...), # Tipo de vivienda del solicitante
    income_range: str = Form(...), # Rango de ingresos del solicitante
    yard: str = Form(...), # Si tiene patio (Sí, No)
    mt2_yard: int = Form(...),  # Metros cuadrados del patio
    another_pet: str = Form(...), # Si tiene otra mascota (Sí, No)
    another_pet_desc: str = Form(...), # Descripción de la otra mascota (si aplica)
    status_appli: str = Form(...), # Estado de la solicitud (Pendiente, Aprobada, Rechazada)
    db: Session = Depends(get_db) # Sesión de la base de datos
):
    # Creación de una instancia del modelo de solicitud de adopción
    application = ApplicationModel(
        create_at=create_at,
        name=name,
        last_name=last_name,
        age=age,
        genre=genre,
        email=email,
        phone=phone,
        type_appli=type_appli,
        employm_situ=employm_situ,
        type_of_house=type_of_house,
        income_range=income_range,
        yard=yard,
        mt2_yard=mt2_yard,
        another_pet=another_pet,
        another_pet_desc=another_pet_desc,
        status_appli=status_appli
    )
    db.add(application) # Agrega la nueva solicitud a la sesión de la base de datos
    db.commit() # Guarda (commitea) la nueva solicitud en la base de datos
    db.refresh(application) # Refresca la instancia de la solicitud para obtener los datos actualizados
    return application # Retorna la solicitud actualizada

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
