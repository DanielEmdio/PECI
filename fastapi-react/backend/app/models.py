# DESCRIPTION:
# In this file are all the definitions for the tables in our database

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from database import Base

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    password = Column(String, index=True)
    token = Column(String, index=True)
    role = Column(String, index=True) # free, premium, pt, admin
    pt_ids = Column(String, index=True) # refers to a user id
    videos = Column(String, index=True)

class Videos(Base):
    __tablename__ = 'videos'

    id = Column(Integer, primary_key=True, index=True)
    restricted = Column(Boolean, index=True)
    Pt = Column(Integer, ForeignKey("pts.id"), index=True) # refers to a user id

# class Users(Base):
#     __tablename__ = 'users'
# 
#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, index=True)
#     password = Column(String, index=True)
#     token = Column(String, index=True)
#     role = Column(String, index=True) # free, premium, admin
#     pt_ids = Column(String, index=True)

# class Pts(Base):
#     __tablename__ = 'pts'
# 
#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, index=True)
#     password = Column(String, index=True)
#     token = Column(String, index=True)
#     videos = Column(String, index=True)
