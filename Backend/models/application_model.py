from sqlalchemy import Column, Enum, Date
from sqlalchemy.sql.sqltypes import Integer, String
from Backend.config.data_base import base

class create_application(base):
    __tablename__ = "solicitudadopcion"

    id = Column(Integer, primary_key=True, autoincrement=True)
    create_at = Column(Date)
    name = Column(String(100))
    last_name = Column(String(100))
    age = Column(Integer)
    genre = Column(Enum('F', 'M'))
    email = Column(String(100))
    phone = Column(Integer)
    type_appli = Column(Enum('adopcion', 'transitorio'))
    employm_situ = Column(Enum('empleado', 'desempleado', 'pensionado'))
    type_of_house = Column(Enum('casa', 'depto'))
    income_range = Column(Enum('500.000-700.000', '700.001-900.000', '900.001-1.100.000', '1.100.001- y más'))
    yard = Column(Enum('si', 'no'))
    mt2_yard = Column(Integer)
    another_pet = Column(Enum('si', 'no'))
    another_pet_desc = Column(String(100))
    status_appli = Column(Enum('pendiente', 'aprobada', 'rechazada'))


