from repository.subs import SubscriptionsRepository
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
    
    #@staticmethod
    #def get_pt_by_email(email: str) -> Optional[models.PersonalTrainer]:
    #    return db.query(models.PersonalTrainer).filter(models.PersonalTrainer.email == email).first()

    @staticmethod
    def get_pt_by_token(token: str) -> Optional[models.PersonalTrainer]:
        return db.query(models.PersonalTrainer).filter(models.PersonalTrainer.token == token).first()

    @staticmethod
    def get_pt_by_username_password(username: str, password: str) -> Optional[models.PersonalTrainer]:
        return db.query(models.PersonalTrainer).filter(models.PersonalTrainer.username == username and models.PersonalTrainer.password == password).first()

    @staticmethod
    def get_pt_username_token(pt_id: str) -> Optional[models.PersonalTrainer]: # retorna o username e o token 
        return db.query(models.PersonalTrainer.username,models.PersonalTrainer.token).filter(models.PersonalTrainer.id == pt_id).first()

    @staticmethod
    def get_pts(skip: int = 0, limit: int = 100) -> list[models.PersonalTrainer]: # retrieve all users
        return db.query(models.PersonalTrainer).offset(skip).limit(limit).all()

    @staticmethod
    def get_new_pts(user_id) -> list[models.PersonalTrainer]: 
        pt_ids_to_exclude = SubscriptionsRepository.get_pt_ids_for_user(user_id)     # get the pts ids to which the user is subbed

        return db.query(models.PersonalTrainer).filter(~models.PersonalTrainer.id.in_(pt_ids_to_exclude)).all()
    # details will be dictionary with the following keys: name, email, description, tags, photo, price, slots, lang, hours, education, bg
    @staticmethod
    def update_pt_details(pt_id: int, details):
        pt = db.query(models.PersonalTrainer).filter(models.PersonalTrainer.id == pt_id).first()
        for key in details:
            setattr(pt, key, details[key])
        db.commit()


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
        print("unrestricted_videos: ",unrestricted_videos)
        print("private_videos: ",private_videos)
        if private_videos == None or private_videos == []:
            return unrestricted_videos

        # put all videos in a single list
        videos = unrestricted_videos+private_videos
        return videos
    
    @staticmethod
    def getPTVideos(pt_id: int) -> Optional[List[models.Video]]:
        private_videos = VideosRepository.getPtPrivVideos(pt_id)
        if private_videos == None:
            return []
        
        # add the username of the pt to the videos
        pt_username = PersonalTrainersRepository.getPtUsername(pt_id)
        for video in private_videos:
            video.pt_username = pt_username

        return private_videos

    @staticmethod
    def getPtUsername(pt_id: str) -> Optional[str]:
        return db.query(models.PersonalTrainer.username).filter(models.PersonalTrainer.id == pt_id).scalar() # scalar() returns the first column of the first row

    @staticmethod
    def hasAccessToVideo(pt_id: int, videoname: str) -> bool:
        videos = PersonalTrainersRepository.getAccessibleVideos(pt_id)
        if videos:
            for video in videos:
                # video = video[0] # video é por exemplo ('./video/pullUps.mp4',), por isso é que preciso de ir buscar o primeiro elemento
                if videoname in video.videopath:
                    return True

        return False

    @staticmethod
    def hasAccessToImage(pt_id: int, imagename: str) -> bool:
        return True

    @staticmethod
    def logIn(pt: models.PersonalTrainer) -> str:
        # check if user already has a token
        if PersonalTrainersRepository.get_pt_by_username_password(pt.username, pt.password).token != None:
            jwt_token: str = create_jwt_access_token({ "token": pt.token, "isNormalUser": False })
            return jwt_token

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
