from repository.videos import VideosRepository
from auth.oauth2_jwt import *
from database import db
from typing import List
import models, schemas
import random, string

class PersonalTrainersRepository():
    @staticmethod
    def create(pt: schemas.BasicPersonalTrainer) -> models.PersonalTrainer:
        # create pt
        db_pt = models.PersonalTrainer(**pt.model_dump())
        db.add(db_pt)
        db.commit()
        db.refresh(db_pt)
        return db_pt

    @staticmethod
    def get_pt(pt_id: int) -> Optional[models.PersonalTrainer]:
        return db.query(models.PersonalTrainer).filter(models.PersonalTrainer.id == pt_id).first()

    @staticmethod
    def get_pt_by_username(username: str) -> Optional[models.PersonalTrainer]: # retorna o username e o token 
        return db.query(models.PersonalTrainer).filter(models.PersonalTrainer.username == username).first()

    @staticmethod
    def get_pt_by_token(token: str) -> Optional[models.PersonalTrainer]:
        return db.query(models.PersonalTrainer).filter(models.PersonalTrainer.token == token).first()

    @staticmethod
    def get_py_by_username_password(username: str, password: str) -> Optional[models.PersonalTrainer]:
        return db.query(models.PersonalTrainer).filter(models.PersonalTrainer.username == username and models.PersonalTrainer.password == password).first()

    @staticmethod
    def get_pt_username_token(pt_id: str) -> Optional[models.PersonalTrainer]: # retorna o username e o token 
        return db.query(models.PersonalTrainer.username,models.PersonalTrainer.token).filter(models.PersonalTrainer.id == pt_id).first()

    # @staticmethod
    # def get_pt_username(pt_id: str): # retorna o username do PersonalTrainer, com base no seu id
    #     return db.query(models.PersonalTrainer.username).filter(models.PersonalTrainer.id == pt_id).scalar()
    # @staticmethod
    # def get_pt_priv_videos(pt_id:str):
    #     result = (
    #         db.query(models.PersonalTrainer)
    #         .filter(models.PersonalTrainer.id == pt_id)
    #         .first()
    #     )
    #     if result:
    #         videos = result.workouts
    #         videos = [vid for vid in videos if vid.restricted==1]
    #         return videos
    #     else:
    #         return None
    # @staticmethod
    # def get_pt_videos(pt_id:str):
    #     result = (
    #         db.query(models.PersonalTrainer)
    #         .filter(models.PersonalTrainer.id == pt_id)
    #         .first()
    #     )
    #     if result:
    #         videos = result.workouts
    #         return videos
    #     else:
    #         return None

    @staticmethod
    def getAccessibleVideos(pt_id: int) -> Optional[List[models.Video]]:
        unrestricted_videos = VideosRepository.getUnrestrictedVideos()
        private_videos =  VideosRepository.getPtPrivVideos(pt_id)

        if private_videos == None:
            return unrestricted_videos

        # put all videos in a single list
        return unrestricted_videos.extend(private_videos)

    @staticmethod
    def logIn(pt: models.PersonalTrainer) -> str:
        # check if user already has a token
        if PersonalTrainersRepository.get_user_by_username_password(pt.username, pt.password).token != None:
            return pt.token

        # generate the new token for the user
        token = ''.join(random.choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(12))
        while len(db.query(models.PersonalTrainer).filter(models.PersonalTrainer.token == token).all()) > 0:
            token = ''.join(random.choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(12))

        # assign the new token and update the db
        pt.token = token
        db.commit()

        jwt_token: str = create_jwt_access_token({ "token": token, "isNormalUser": False })
        return jwt_token

    @staticmethod
    def logOut():
        pass
