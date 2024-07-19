from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from Backend.config.data_base import base


class create_user_model(base):
    __tablename__ = "usuario"
    id = Column(Integer, primary_key=True, autoincrement=True)
    create_at =  Column(String(250), nullable=False)
    name = Column(String(255), nullable=False)
    username = Column(String(255), nullable=False)
    year = Column(Integer, nullable=False)
    phone = Column(String(255), nullable=False)
    country = Column(String(255), nullable=False)
    gender = Column(String(255), nullable=False)
    imgen_profile =  Column(String(250), nullable=False)
    email= Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)      
    
 
#Variable "base" (obtiene el metodo declarativo -> declarative_base(), extencion de SQLalchemy.ext.declarative)
#Declarative_base te permite definir de manera rapida tablas y modelos


