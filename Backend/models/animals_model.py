from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from Backend.config.data_base import base


class create_animals(base):
    __tablename__ = "animales"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    year = Column(Integer, nullable=False)
    raza = Column(String(255), nullable=False)