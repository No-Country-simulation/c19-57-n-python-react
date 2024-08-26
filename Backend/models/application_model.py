from sqlalchemy import Table, Column, Enum, Date,ForeignKey
from sqlalchemy.sql.sqltypes import Integer, String
from Backend.config.data_base import base
from sqlalchemy.orm import relationship



class create_application(base):
    __tablename__ = "solicitudadopcion"

    id = Column(Integer, primary_key=True, index= True, autoincrement=True)
    create_at = Column(Date, nullable=False)
    name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    genre = Column(Enum('F', 'M'), nullable=False)
    email = Column(String(100), nullable=False, index= True)
    phone = Column(Integer, nullable=False)
    type_appli = Column(Enum('adopcion', 'transitorio'), nullable=False)
    employm_situ = Column(Enum('empleado', 'desempleado', 'pensionado'), nullable=False)
    income_range = Column(Enum('500.000-700.000', '700.001-900.000', '900.001-1.100.000', '1.100.001- y más'), nullable=True)
    type_of_house = Column(Enum('casa', 'depto'), nullable=False)
    yard = Column(Enum('si', 'no'), nullable=False)
    mt2_yard = Column(Integer, nullable=True)
    another_pet = Column(Enum('si', 'no'), nullable=False)
    another_pet_desc = Column(String(100), nullable=True)
    status_appli = Column(Enum('pendiente', 'aprobada', 'rechazada'), nullable=True)
    id_mascota = Column(Integer, ForeignKey('mascota.id'), nullable=False)
    mascota = relationship('create_animals', back_populates='applications')