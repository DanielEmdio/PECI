from repository.pts import PersonalTrainersRepository
from repository.users import UsersRepository
from models import PersonalTrainer
from fastapi import APIRouter
from auth.oauth2_jwt import *
import schemas

router = APIRouter(prefix="/pts")

# @router.post("/addPTCustom",response_model=schemas.BasicPersonalTrainer)
# async def add_pt(pt: schemas.BasicPersonalTrainer):
#     new_pt = PersonalTrainer(**pt.model_dump())
#     PersonalTrainersRepository.create(new_pt)
#     return new_pt   

# @router.post("/add")
# async def add_PT():
#     # add a pt with name 'PT3' and password '123'
#     newPT = PersonalTrainer(username="PT3", password="123",token="")
#     PersonalTrainersRepository.create(newPT)
#     return newPT    

# @router.post("/getPTbyUsername")
# async def get_PT_by_username(username):
#     pt = PersonalTrainersRepository.get_pt_by_username(username)
#     print(pt)
#     return pt

# @router.post("/getAll")
# async def get_all():
#     pts = PersonalTrainersRepository.get_pts()
#     return {"result":"ok","pts":pts}

# @router.post("/getNewPts")
# async def get_new_pts(token: schemas.TokenData):
#     jwt_data: Optional[str] = get_jwt_token_data(token=token.token)
#     if jwt_data == None:
#         return { "result": "no", "error": "Unauthorized." }
# 
#     if jwt_data["isNormalUser"] == True:
#         user_id: int = UsersRepository.get_user_by_token(token=jwt_data["token"]).id
#         if user_id == None:
#             return { "result": "no", "error": "Unauthorized." }
#         pts = PersonalTrainersRepository.get_new_pts(user_id)
#         pts = [{"name":pt.name, "description":pt.description, "tags":pt.tags, "photo":pt.photo, "price":pt.price} for pt in pts]
#         return {"result":"ok","pts":pts}
#     else:
#             return { "result": "no", "error": "Unauthorized." }
    