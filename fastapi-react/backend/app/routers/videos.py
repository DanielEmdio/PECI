from repository.users import UsersRepository
from fastapi import APIRouter
from typing import Tuple
import schemas
from models import Video
from repository.videos import VideosRepository

router = APIRouter(prefix="/videos")


@router.post("/getAccessibleVideos")        
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
    return my_videos

@router.post("/getPTvideos")
async def read_root3():
    # Retrieve the videos from pt with id '1'
    pt_id = 1
    videos = VideosRepository.get_pt_videos(pt_id)
    print(videos)
    return videos

@router.post("/addVideo")  # NÃO ASSOCIA O VIDEO AO PT 
async def read_root3(videopath,videoname,description,muscletargets,releasedate,restricted=0):
    video = Video(videopath=videopath,videoname=videoname,description=description,muscletargets=muscletargets,releasedate=releasedate,restricted=restricted)
    video = VideosRepository.create(video)
    return video

@router.post("/getAllVideos")
async def read_root3():
    # Retrieve the user with name 'user2' and eagerly load the related PTs
    videos = VideosRepository.getAllVideos()
    print(videos)
    return videos


