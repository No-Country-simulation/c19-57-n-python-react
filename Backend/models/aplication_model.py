from sqlalchemy import Table, Column, Enum, Date
from sqlalchemy.sql.sqltypes import Integer, String
from Backend.config.data_base import base



class create_aplication(base):
    __tablename__ = "solicitudadopcion"

    id = Column(Integer, primary_key=True, autoincrement=True)
    create_at = Column(Date)
    name = Column(String(250))
    last_name = Column(String(250))
    age = Column(Integer)
    genre = Column(String(250))
    email = Column(String(250))
    phone = Column(Integer)
    type_appli = Column(String(250))
    employm_situ = Column(String(250))
    type_of_house = Column(String(250))
    income_range = Column(String(250))
    yard = Column(String(250))
    mt2_yard = Column(Integer)
    another_pet = Column(String(250))
    another_pet_desc = Column(String(250))
    status_appli = Column(String(250))