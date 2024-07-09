from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+pymysql://root:root@localhost:3306/personal")

localsesion = sessionmaker(autoflush=False, autocommit=False, bind=engine)

base = declarative_base()