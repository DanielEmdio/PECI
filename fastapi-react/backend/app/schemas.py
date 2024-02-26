# DESCRIPTION:
# In this file are all the definitions for the Pydantic models

from pydantic import BaseModel
# from typing import Any, Dict

########################  USER RELATED  ########################
class UserBase(BaseModel):
    username: str

class BasicUser(UserBase):
    password: str

class User(UserBase):
    id: int
    token: str
    subscriptions: list['Subscription'] = [] # the quotes are needed because the class "Subscription" is defined later (at the end of the file)

    class Config:
        from_attributes = True # orm_mode = True

class UserRegister(BasicUser):
    isNormalUser: bool


########################  PERSONAL TRAINER RELATED  ########################
class PersonalTrainerBase(BaseModel):
    username:str

class BasicPersonalTrainer(PersonalTrainerBase):
    password: str

class PersonalTrainer(PersonalTrainerBase):
    id: int
    token: str
    name: str
    description: str
    tags: str
    photo: str
    price: str
    subscriptions: list['Subscription'] = []
    workout: list['Video'] = []

    class Config:
        from_attributes = True #orm_mode = True


########################  VIDEO RELATED  ########################
class VideoBase(BaseModel):
    pass

class VideoCreate(VideoBase):
    videopath: str
    videoname: str
    description: str
    muscletargets: str
    releasedate: str
    restricted: int

class Video(VideoBase):
    id: int
    personal_trainer_id:int
    thumbnail: str

    class Config:
        from_attributes = True #orm_mode = True


########################  SUBSCRIPTION RELATED  ########################
class SubscriptionBase(BaseModel):
    pass

class SubscriptionCreate(SubscriptionBase):
    pass

class Subscription(SubscriptionBase):
    user: User
    personal_trainer: PersonalTrainer

    class Config:
        from_attributes = True # orm_mode = True

########################  RANDOM  ########################

class TokenData(BaseModel):
    token: str
