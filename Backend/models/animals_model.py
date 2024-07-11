from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from Backend.config.data_base import base


class create_animals(base):
    __tablename__ = "animales"
    id = Column(Integer, primary_key=True, autoincrement=True)
    create_at = Column(String(250), nullable=False)
    name = Column(String(250), nullable=False)
    animal_type = Column(String(250), nullable=False)
    race = Column(String(250), nullable=False)
    year = Column(Integer, nullable=False)
    history = Column(String(250), nullable=False)
    gender = Column(String(250), nullable=False)
    size = Column(String(250), nullable=False)
    characteristics = Column(String(250), nullable=False)
    location = Column(String(250), nullable=False)
    status = Column(Integer, nullable=False)
    imgen_profile = Column(String(250), nullable=False)
    imgen_details = Column(String(250), nullable=False)