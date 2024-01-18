from pydantic import BaseModel




class UserBase(BaseModel):
    token: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    PTid:int
   

    class Config:
        orm_mode = True


class PTBase(BaseModel):
    token: str


class PTCreate(PTBase):
    PT:str
    password: str


class PT(PTBase):
    id: int
   

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