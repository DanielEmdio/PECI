# DESCRIPTION:
# In this file are all the definitions for the tables in our database

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# class Users(Base):
#     __tablename__ = 'users'

#     id = Column(Integer, primary_key=True)
#     username = Column(String, index=True)
#     password = Column(String, index=True)
#     token = Column(String, index=True)
#     #role = Column(String, index=True) # free, premium, pt, admin
#     PTid = Column(Integer, ForeignKey("pts.id")) # refers to a pt id
#     #videos = Column(String, index=True)

# class PTs(Base):
#     __tablename__ = 'pts'

#     id = Column(Integer, primary_key=True)
#     token = Column(String, index=True)
#     PT = Column(String, index=True)
#     password = Column(String, index=True)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, index=True)
    password = Column(String, index=True)
    token = Column(String, index=True)
    
    subscriptions = relationship("Subscription", back_populates="user")    # se fizermos um request pedindo pela coluna "subscriptions", isso retornará todos os pts a que o "user" se subscreveu

class PersonalTrainer(Base):
    __tablename__ = 'personal_trainers'

    id = Column(Integer, primary_key=True)
    token = Column(String, index=True)
    username = Column(String, index=True)
    password = Column(String, index=True)
    subscriptions = relationship("Subscription", back_populates="personal_trainer")
    workouts = relationship("Video", back_populates="personal_trainer")

class Video(Base):
    __tablename__ = 'videos'

    id = Column(Integer, primary_key=True)
    videopath = Column(String,index=True)
    videoname = Column(String,index=True)
    description = Column(String,index=True)
    muscletargets = Column(String,index=True)
    releasedate = Column(String,index=True)
    restricted = Column(Integer, index=True)
    #Pt = Column(Integer, ForeignKey("pts.id"), index=True) # refers to a user id
    personal_trainer_id = Column(Integer, ForeignKey("personal_trainers.id"), index=True)

    personal_trainer = relationship("PersonalTrainer", back_populates="workouts")

class Subscription(Base):
    __tablename__ = "subscriptions"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    personal_trainer_id = Column(Integer, ForeignKey("personal_trainers.id"), primary_key=True)
    #Both user_id and personal_trainer_id are defined as primary keys because, together, they form a composite primary key for the subscriptions table. 
    #This means that each combination of user_id and personal_trainer_id must be unique in the table

    user = relationship("User", back_populates="subscriptions")
    personal_trainer = relationship("PersonalTrainer", back_populates="subscriptions")

# class Pt_video_connection(Base):
#     __tablename__ = "pt_video_connection"

#     pt_id = Column(Integer, ForeignKey("pts.id"),primary_key=True)
#     video_id = Column(Integer, ForeignKey("videos.id"),primary_key=True)

#     video = relationship("Videos",back_populates="owner")
#     pt = relationship("Pts",back_populates="workouts")

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
