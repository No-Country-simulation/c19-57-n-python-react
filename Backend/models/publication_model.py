from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Boolean
from Backend.config.data_base import base


class create_publication(base):
    __tablename__ = "publicaciones"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    datetime = Column(String(250), nullable=False)
    user_id = Column(String(250), nullable=False)
    user_name = Column(String(255), nullable=False)
    status= Column(Boolean, nullable=False)
    animal_name = Column(String(250), nullable=False)
    animal_raza = Column(String(250), nullable=False)
    animal_year = Column(Integer, nullable=False)