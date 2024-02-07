"""from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}


"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import db
from sqlalchemy.orm import joinedload
from contextlib import asynccontextmanager
from routers import users
from models import User, PersonalTrainer, Video
from repository.users import UsersRepository
from repository.pts import PersonalTrainersRepository
from repository.videos import VideosRepository
from repository.subs import SubscriptionsRepository
import schemas

@asynccontextmanager
async def lifespan(app):
    # global db
    # models.Base.metadata.create_all(bind=engine)
    db.init()

    yield

    db.close()

app = FastAPI(lifespan=lifespan)
app.include_router(users.router)
# models.Base.metadata.create_all(bind=engine)
# db = get_db()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"hi": "hello"}

@app.post("/addUserCustom",response_model=schemas.UserCreate)
async def read_root2(user: schemas.UserCreate):
    # add a user with name 'user2' and password 'password'
    new_user = User(**user.model_dump())
    UsersRepository.create(new_user)
    return new_user

@app.post("/addUser")
async def read_root2():
    # add a user with name 'user2' and password 'password'
    newUser = User(username="user3", password="password", token="")
    UsersRepository.create(newUser)
    return {"hi": "hello"}

@app.post("/printusers")
async def read_root2():
    # this return all the users with name 'user'
    # print("--------------HELLOOOOO--------")
    # user = db.query(Users).filter(Users.username == "user2").all()
    # print(user)
    # return {"hi": user}
    users = UsersRepository.get_users()
    print(users)
    return {"hi": users}



@app.post("/printusersubs")
async def read_root3():
    # Retrieve the user with name 'user2' and eagerly load the related PTs
    # PTs_info = crud.get_subs(db,2)
    # print(PTs_info)
    # return {"hi": PTs_info}
    user_id=2
    PTs_info = SubscriptionsRepository.get_pts_for_user(user_id)
    return {"hi": PTs_info}



@app.post("/printMyVideos")
async def read_root3():
    # Retrieve the videos that the user has access to
    user_id=3
    my_videos = UsersRepository.get_my_videos(user_id)
    if my_videos!=None:
        my_videos=my_videos
        print("My videos: ")
        for vid in my_videos:
            video = {key: value for key, value in vid.__dict__.items() if key != '_sa_instance_state'}
            print(video,"\n")
        return {"hi":my_videos}
    return {"hi":None}
    



@app.post("/addPTCustom",response_model=schemas.PersonalTrainerCreate)
async def add_pt(pt: schemas.PersonalTrainerCreate):
    new_pt = PersonalTrainer(**pt.model_dump())
    PersonalTrainersRepository.create(new_pt)
    return new_pt   

@app.post("/addPT")
async def add_PT():
    # add a pt with name 'PT1' and password '123'
    print("--------------HELLOOOOO--------")
    newPT = PersonalTrainer(username="PT3", password="123",token="")
    PersonalTrainersRepository.create(newPT)
    return {"message": "PT added successfully"}    

@app.post("/printPTbyUsername")
async def read_root3():
    username = "PT3"
    pt = PersonalTrainersRepository.get_pt_by_username(username)
    print(pt)
    return {"hi": pt}



@app.post("/printPTvideos")
async def read_root3():
    # Retrieve the videos from pt with id '1'
    pt_id = 1
    videos = VideosRepository.get_pt_videos(pt_id)
    print(videos)
    return {"hi": videos}



@app.post("/addVideo")  # NÃO ASSOCIA O VIDEO AO PT 
async def read_root3(videopath,videoname,description,muscletargets,releasedate,restricted=0):
    video = Video(videopath=videopath,videoname=videoname,description=description,muscletargets=muscletargets,releasedate=releasedate,restricted=restricted)
    video = VideosRepository.create(video)
    return video

@app.post("/printAllVideos")
async def read_root3():
    # Retrieve the user with name 'user2' and eagerly load the related PTs
    videos = VideosRepository.getAllVideos()
    print(videos)
    return {"hi": videos}






# testing
@app.post("/printPTUsernameToken")
async def read_root3():
    # Retrieve the user with name 'user2' and eagerly load the related PTs
    username,token = PersonalTrainersRepository.get_pt_username_token(1)
    return {"username": username, "token":token}


@app.post("/printusersubsV2")
async def read_root3():
    # Retrieve the user with name 'user2' and eagerly load the related PTs
    user = (
        db.query(User)
        .filter(User.username == "user1")
        .options(joinedload(User.subscriptions))
        .first()
    )

    if user:
        # Access the related PTs objects using user.pts
        subs_list = user.subscriptions
        pt_ids = [subscription.personal_trainer_id for subscription in subs_list]
        pts = []
        for id in pt_ids:
            pts+=db.query(PersonalTrainer).filter(PersonalTrainer.id==id)
        print(pts)
        #print(subs_list)
        #pt_ids = [pt.id for pt in subs_list]        # para dar return apenas ao id de cada um dos pts
        #print(pt_ids)
        return {"relation list": subs_list, "pts":pts}
    else:
        return {"hi": "User not found"}


