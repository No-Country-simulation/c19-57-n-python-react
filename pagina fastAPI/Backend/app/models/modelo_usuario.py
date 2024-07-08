from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from Backend.app.config.base_datos import base


class create(base):
    __tablename__ = "usuario"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    surname = Column(String(255), nullable=False)
    year = Column(Integer, nullable=False)
    phone = Column(String(255), nullable=False)
    email= Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
 
#Variable "base" (obtiene el metodo declarativo -> declarative_base(), extencion de SQLalchemy.ext.declarative)
#Declarative_base te permite definir de manera rapida tablas y modelos


