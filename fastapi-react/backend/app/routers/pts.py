from fastapi import APIRouter
import schemas
from models import PersonalTrainer
from repository.pts import PersonalTrainersRepository

router = APIRouter(prefix="/pts")

@router.post("/addPTCustom",response_model=schemas.BasicPersonalTrainer)
async def add_pt(pt: schemas.BasicPersonalTrainer):
    new_pt = PersonalTrainer(**pt.model_dump())
    PersonalTrainersRepository.create(new_pt)
    return new_pt   

@router.post("/add")
async def add_PT():
    # add a pt with name 'PT3' and password '123'
    newPT = PersonalTrainer(username="PT3", password="123",token="")
    PersonalTrainersRepository.create(newPT)
    return newPT    

@router.post("/getPTbyUsername")
async def read_root3():
    username = "PT3"
    pt = PersonalTrainersRepository.get_pt_by_username(username)
    print(pt)
    return pt
