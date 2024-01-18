# DESCRIPTION:
# In this file are all the definitions for the tables in our database

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, index=True)
    password = Column(String, index=True)
    token = Column(String, index=True)
    #role = Column(String, index=True) # free, premium, pt, admin
    PTid = Column(Integer, ForeignKey("pts.id"), index=True) # refers to a pt id
    #videos = Column(String, index=True)

class PTs(Base):
    __tablename__ = 'pts'

    id = Column(Integer, primary_key=True)
    token = Column(String, index=True)

    PT = Column(String, index=True)
    password = Column(String, index=True)

class Videos(Base):
    __tablename__ = 'videos'

    id = Column(Integer, primary_key=True)
    videopath = Column(String,index=True)
    videoname = Column(String,index=True)
    description = Column(String,index=True)
    muscletargets = Column(String,index=True)
    releasedate = Column(String,index=True)
    restricted = Column(Boolean, index=True)
    #Pt = Column(Integer, ForeignKey("pts.id"), index=True) # refers to a user id

class Pt_video_connection(Base):
    __tablename__ = "pt_video_connection"

    pt_id = Column(Integer, ForeignKey("pts.id"),primary_key=True)
    video_id = Column(Integer, ForeignKey("videos.id"),primary_key=True)

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
