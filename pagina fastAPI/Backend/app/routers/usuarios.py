from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from Backend.app.schemas.usuarios_esquema import crear_usuario, obtener_usuario, editar_usuario, eliminar_usuario
from Backend.app.config.base_datos import localsesion
from Backend.app.models import modelo_usuario
from Backend.app.models.modelo_usuario import create
from Backend.app.config.base_datos import engine
import hashlib

modelo_usuario.base.metadata.create_all(bind=engine)
usuario_root = APIRouter()


def get_db(): #
    db = localsesion()
    try:
        yield db
    finally:
        db.close

@usuario_root.get('/api/user/',)
def todos_los_usuarios(db: Session = Depends(get_db)):
    consulta = db.query(modelo_usuario.create).all()
    return consulta
        
    
@usuario_root.get('/api/user/{id}')
def usuario_unico(id: int, db: Session = Depends(get_db)):
    consulta = db.query(modelo_usuario.create).all()
    for x in consulta:
        if id == x.id:
            return f"Usuario encontrado, id: {x.id}, nombre: {x.name}"
    raise HTTPException(status_code=404, detail="ID de usuario no existe")


@usuario_root.post("/api/user",response_model=None)
def crear_usuario(user: crear_usuario, db: Session = Depends(get_db)) -> any:
    try:
        #hash_pass = hashlib.md5(f"{user.password}".encode("utf-8"), usedforsecurity=True)
        #print(hash_pass.hexdigest())
        users = create(name=user.name, surname=user.surname, year=user.year, phone=user.phone, email=user.email, password=user.password)
        db.add(users)
        db.commit()
        db.refresh(users)
        return "Datos cargados correctamente!"
    except Exception as e:
        return e
        
@usuario_root.put("/api/users")
def editar_usuario():
    pass
      
                
    
