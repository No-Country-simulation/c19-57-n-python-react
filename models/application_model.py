from sqlalchemy import Column, Enum, Date
from sqlalchemy.sql.sqltypes import Integer, String
from Backend.config.data_base import base

class create_application(base):
    __tablename__ = "solicitudadopcion"

    id = Column(Integer, primary_key=True, autoincrement=True)
    create_at = Column(Date)
    name = Column(String)
    last_name = Column(String)
    age = Column(Integer)
    genre = Column(String)
    email = Column(String)
    phone = Column(Integer)
    type_appli = Column(String)
    employm_situ = Column(String)
    type_of_house = Column(String)
    income_range = Column(String)
    yard = Column(String)
    mt2_yard = Column(Integer)
    another_pet = Column(String)
    another_pet_desc = Column(String)
    status_appli = Column(String)










    # __tablename__ = "solicitudadopcion"
    # id = Column(Integer, primary_key=True, index=True)
    # create_at = Column(Date, nullable=False)
    # name = Column(String(100), nullable=False)
    # last_name = Column(String(100), nullable=False)
    # age = Column(Integer, nullable=False)
    # genre = Column(Enum("M", "F"), nullable=False)
    # email = Column(String(100), nullable=False)
    # phone = Column(Integer, nullable=False)
    # type_appli = Column(Enum("Adoption", "Foster"), nullable=False)
    # employm_situ = Column(Enum("Employed", "Unemployed"), nullable=False)
    # type_of_house = Column(Enum("Apartment", "House"), nullable=False)
    # income_range = Column(Enum("Low", "Medium", "High"), nullable=False)
    # yard = Column(Enum("Yes", "No"), nullable=False)
    # mt2_yard = Column(Integer, nullable=False)
    # another_pet = Column(Enum("Yes", "No"), nullable=False)
    # another_pet_desc = Column(String(100), nullable=True)
    # status_appli = Column(Enum("Pending", "Approved", "Rejected"), nullable=False)