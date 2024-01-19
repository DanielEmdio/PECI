from pydantic import BaseModel


class PTBase(BaseModel):
    token: str


class PTCreate(PTBase):
    pt:str
    password: str


class PT(PTBase):
    id: int
    subscriptors_id: int

    class Config:
        orm_mode = True





class UserBase(BaseModel):
    token: str

class UserCreate(UserBase):
    username: str
    password: str


class User(UserBase):
    id: int
    pts:list[PT] = []
   

    class Config:
        orm_mode = True





class VideoBase(BaseModel):
    email: str


class VideoCreate(VideoBase):
    password: str


class Video(VideoBase):
    id: int
   

    class Config:
        orm_mode = True