# DESCRIPTION:
# This file connects and configures the database
# and some other related things like orm (Object-relational mapping)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE = 'postgresql://postgres:postgres@localhost:5432/peci'

engine = create_engine(URL_DATABASE)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    return db

    # try:
    #     return db
    # except:
    #     db.close()
