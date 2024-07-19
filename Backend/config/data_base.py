from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+pymysql://root:4577@localhost/no_country")

localsesion = sessionmaker(autoflush=False, autocommit=False, bind=engine)

base = declarative_base()