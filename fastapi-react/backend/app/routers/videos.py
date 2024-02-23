from repository.pts import PersonalTrainersRepository
from repository.videos import VideosRepository
from repository.users import UsersRepository
from fastapi import APIRouter
from auth.oauth2_jwt import *
from models import Video

router = APIRouter(prefix="/videos")

@router.post("/getAccessibleVideos")        
def get_accessible_videos(jwt_token: str):
    jwt_data: Optional[str] = get_jwt_token_data(jwt_token=jwt_token)
    if jwt_data == None:
        return { "result": "no", "error": "Unauthorized." }

    if jwt_data["isNormalUser"] == True:
        user_id: str = UsersRepository.get_user_by_token(token=jwt_data["token"])

        # retrieve the videos that the user has access to
        videos = UsersRepository.getAccessibleVideos(user_id)
    else:
        pt_id: str = PersonalTrainersRepository.get_pt_by_token(token=jwt_data["token"])
        videos = PersonalTrainersRepository.getAccessibleVideos(pt_id)

    return { "result": "ok", "videos": videos if videos != None else [] }

# @router.post("/getPTvideos")
# async def read_root3():
#     # Retrieve the videos from pt with id '1'
#     pt_id = 1
#     videos = VideosRepository.get_pt_videos(pt_id)
#     print(videos)
#     return videos

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
