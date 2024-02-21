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
    return {"item_name": item.name, "item_id": item_id}"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import db
from sqlalchemy.orm import joinedload
from contextlib import asynccontextmanager
from routers import users, pts, videos
from models import User, PersonalTrainer, Video
from repository.users import UsersRepository
from repository.pts import PersonalTrainersRepository
from repository.videos import VideosRepository
from repository.subs import SubscriptionsRepository
from os import environ
import schemas

@asynccontextmanager
async def lifespan(app):
    # global db
    # models.Base.metadata.create_all(bind=engine)
    db.init()

    yield

    db.close()

# start app and import the app routes
root_path = "/api" if "URL_DATABASE" in environ else ""
app = FastAPI(lifespan=lifespan, root_path=root_path)
app.include_router(users.router)
app.include_router(pts.router)
app.include_router(videos.router)




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







########################  TESTING  ########################
@app.post("/getPTUsernameToken")
async def read_root3():
    # Retrieve the user with name 'user2' and eagerly load the related PTs
    username,token = PersonalTrainersRepository.get_pt_username_token(1)
    return {"username": username, "token":token}

@app.post("/getUserSubsV2")
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
