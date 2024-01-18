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
from contextlib import asynccontextmanager
from routers import users
from models import Users, PTs
from repository.users import UsersRepository
from repository.pts import PTsRepository
from repository.videos import VideosRepository

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

@app.get("/addPT")
async def add_PT():
    # add a pt with name 'PT1' and password '123'
    print("--------------HELLOOOOO--------")
    newPT = PTs(token="",PT="PT3", password="123")
    db.add(newPT)
    db.commit()
    return {"message": "PT added successfully"}

@app.get("/add")
async def read_root2():
    # add a user with name 'user2' and password 'password'
    newUser = Users(username="user3", password="password", token="",PTid=1)
    db.add(newUser)
    db.commit()
    return {"hi": "hello"}

@app.get("/printuser2")
async def read_root2():
    # this return all the users with name 'user'
    user = db.query(Users).filter(Users.username == "user2").all()
    print(user)
    return {"hi": user}
