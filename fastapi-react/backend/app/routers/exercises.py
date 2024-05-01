from repository.workouts import WorkoutsRepository
from repository.pts import PersonalTrainersRepository
from fastapi import APIRouter, UploadFile, File, Cookie
from repository.users import UsersRepository
from repository.exercises import ExercisesRepository
from fastapi.responses import FileResponse
from auth.oauth2_jwt import *
from pathlib import Path
import schemas
from typing import Annotated

VIDEOS_DIR = Path("videos")
router = APIRouter(prefix="/exercises")

def is_safe_path(video_name: str) -> bool:
    # basic directory traversal mitigation
    return not (".." in video_name or "\\" in video_name or "/" in video_name)

@router.get("/{video_name}")
async def get_video( video_name: str,token: Annotated[str, Cookie()] = None):
    jwt_data = get_jwt_token_data(token=token)
    if jwt_data == None:
        return { "result": "no", "error": "Unauthorized." }

    if jwt_data["isNormalUser"] == True:
        user_id: int = UsersRepository.get_user_by_token(token=jwt_data["token"]).id
        if not UsersRepository.hasAccessToExercise(user_id, video_name):
            return { "result": "no", "error": "Unauthorized." }
    else:
        token = "q3O4kkRbmvD1"
        pt_id: int = PersonalTrainersRepository.get_pt_by_token(token=jwt_data["token"]).id
        if not PersonalTrainersRepository.hasAccessToExercise(pt_id, video_name):
            return { "result": "no", "error": "Unauthorized." }

    if not is_safe_path(video_name):
        return { "result": "no", "error": "Video not found." }

    video_path = VIDEOS_DIR / video_name 
    if not video_path.exists():
        return { "result": "no", "error": "Video not found." }

    return FileResponse(video_path)

@router.post("/upload")
async def upload_video(token: schemas.TokenData, video: UploadFile = File(...)):
    jwt_token_data = get_jwt_token_data(token=token.token)
    if jwt_token_data == None:
        return { "result": "no", "error": "Unauthorized." }

    if jwt_token_data["isNormalUser"]:
        return { "result": "no", "error": "Unauthorized." }

    # save the video to disk
    with open(VIDEOS_DIR / video.filename, "wb") as buffer:
        buffer.write(video.file.read())
    
    return { "result": "ok" }


# @router.post("/addVideo")  # NÃO ASSOCIA O VIDEO AO PT 
# async def read_root3(videopath,videoname,description,muscletargets,releasedate,restricted=0):
#     video = Video(videopath=videopath,videoname=videoname,description=description,muscletargets=muscletargets,releasedate=releasedate,restricted=restricted)
#     video = VideosRepository.create(video)
#     return video

# @router.post("/getAllVideos")
# async def read_root3():
#     # Retrieve the user with name 'user2' and eagerly load the related PTs
#     videos = VideosRepository.getAllVideos()
#     print(videos)
#     return videos

@router.post("/getVideoInfo")        # ESTA FUNÇÃO NÃO FILTRA A INFORMAÇÃO DO VÍDEO.
async def get_video_info( token: schemas.TokenData, exercise_id:int):
    jwt_data = get_jwt_token_data(token=token.token)
    if jwt_data == None:
        return { "result": "no", "error": "Unauthorized." }

    if jwt_data["isNormalUser"] == True:
        user_id: int = UsersRepository.get_user_by_token(token=jwt_data["token"]).id
        exercise = ExercisesRepository.getExercise(exercise_id)
        if not UsersRepository.hasAccessToExercise(user_id, exercise.path):
            return { "result": "no", "error": "Unauthorized." }
    else:
        pt_id: int = PersonalTrainersRepository.get_pt_by_token(token=jwt_data["token"]).id
        exercise = ExercisesRepository.getExercise(exercise_id)
        if not PersonalTrainersRepository.hasAccessToExercise(pt_id, exercise.path):
            return { "result": "no", "error": "Unauthorized." }
        
    return {"result":"ok","video":exercise}

