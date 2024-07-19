from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

engine = create_engine("mysql+pymysql://root:root@localhost:3306/simpleesquema")

localsesion = sessionmaker(autoflush=False, autocommit=False, bind=engine)

base = declarative_base()

# Crear una clase de sesión
SessionLocal = sessionmaker(autoflush=False, autocommit=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

        # Crear una sesión
session = SessionLocal()

try:
    # Ejecutar una consulta simple
    result = session.execute(text("SELECT 1"))
    print("Conexión exitosa. Resultado:", result.scalar())
except Exception as e:
    print("Error al conectar:", str(e))
finally:
    session.close()