# from sqlalchemy import Column, Enum, Date
# from sqlalchemy.sql.sqltypes import Integer, String
# from Backend.config.data_base import base
from sqlalchemy import Column, Enum, Date, Integer, String
from Backend.config.data_base import base

class create_application(base):
    __tablename__ = "solicitudadopcion"

    id = Column(Integer, primary_key=True, autoincrement=True)
    create_at = Column(Date, nullable=False)
    name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    genre = Column(Enum('F', 'M'), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(Integer, nullable=False)
    type_appli = Column(Enum('adopcion', 'transitorio'), nullable=False)
    employm_situ = Column(Enum('empleado', 'desempleado', 'pensionado'), nullable=False)
    type_of_house = Column(Enum('casa', 'depto'), nullable=False)
    yard = Column(Enum('si', 'no'), nullable=False)
    mt2_yard = Column(Integer, nullable=True)
    another_pet = Column(Enum('si', 'no'), nullable=False)
    another_pet_desc = Column(String(100), nullable=True)
    status_appli = Column(Enum('pendiente', 'aprobada', 'rechazada'), nullable=True)
    

