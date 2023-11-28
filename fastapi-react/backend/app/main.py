from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, get_db
from contextlib import asynccontextmanager
import models

@asynccontextmanager
async def lifespan(app):
    global db
    models.Base.metadata.create_all(bind=engine)
    db = get_db()

    yield

    db.close()

app = FastAPI(lifespan=lifespan)
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
    newUser = models.Users(user="user2", password="password", token="")
    db.add(newUser)
    db.commit()
    return {"hi": "hello"}

@app.get("/printuser2")
async def read_root2():
    # this return all the users with name 'user'
    print(db.query(models.Users).filter(models.Users.user == "user").all())
    return {"hi": "hello"}
