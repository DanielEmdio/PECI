from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import db
from contextlib import asynccontextmanager
from routers import users
from models import Users
from repository.users import UsersRepository
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

@app.post("/add")
async def read_root2():
    # add a user with name 'user2' and password 'password'
    newUser = Users(user="user2", password="password", token="")
    db.add(newUser)
    db.commit()
    return {"hi": "hello"}

@app.get("/printuser2")
async def read_root2():
    # this return all the users with name 'user'
    print(db.query(Users).filter(Users.user == "user").all())
    return {"hi": "hello"}
