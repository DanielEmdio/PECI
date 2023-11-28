# DESCRIPTION:
# In this file are all the definitions for the tables in our database

from sqlalchemy import Column, ForeignKey, Integer, String
from database import Base

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    user = Column(String, index=True)
    password = Column(String, index=True)
    token = Column(String, index=True)
    # pt_id = Column(Integer, ForeignKey("Pts.id"))
