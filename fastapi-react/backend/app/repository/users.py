from repository.subs import SubscriptionsRepository
from repository.videos import VideosRepository
from auth.oauth2_jwt import *
from typing import List
from database import db
import models, schemas
import random, string

class UsersRepository():
    @staticmethod
    def create(user: schemas.BasicUser) -> models.User:
        # create user
        db_user = models.User(**user.model_dump())

        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def get_user(user_id: int) -> Optional[models.User]:
        return db.query(models.User).filter(models.User.id == user_id).first()

    @staticmethod
    def get_user_by_token(token: str) -> Optional[models.User]:
        return db.query(models.User).filter(models.User.token == token).first()

    @staticmethod
    def get_user_by_username(username: str) -> Optional[models.User]:
        return db.query(models.User).filter(models.User.username == username).first()

    @staticmethod
    def get_user_by_username_password(username: str, password: str) -> Optional[models.User]:
        return db.query(models.User).filter(models.User.username == username, models.User.password == password).first()

    @staticmethod
    def get_users(skip: int = 0, limit: int = 100) -> list[models.User]: # retrieve all users
        return db.query(models.User).offset(skip).limit(limit).all()

    """@staticmethod
    def get_user_pts(user_id: int):     # retrieve all personal_trainers to which the user is subscribed to
        user = (
            db.query(models.Subscription)
            .filter(models.Subscription.user_id == user_id)
            .options(joinedload(models.Subscription.personal_trainer))
            .all()
        )

        if user:
            # Access the related PTs objects using user.pts
            
            personalTrainers = [usr.personal_trainer for usr in user]
            # subs_list = user.subscriptions
            # pt_ids = [subscription.personal_trainer_id for subscription in subs_list]
            # pts = []
            # for id in pt_ids:
            #     pts+=db.query(models.PersonalTrainer).filter(models.PersonalTrainer.id==id)
            # print(pts)
            
            #return {"relation list": subs_list, "pts":pts}
            return personalTrainers   
        else:
            return {"hi": "User not found"}"""
    
    # @staticmethod
    # def get_user_pts(user_id: int):     # retrieve all personal_trainers to which the user is subscribed to
    #     subscriptions = (
    #         db.query(models.Subscription)
    #         .filter(models.Subscription.user_id == user_id)
    #         .all()
    #     )

    #     if subscriptions:
    #         personal_trainers = [sub.personal_trainer for sub in subscriptions]
    #         return personal_trainers
    #     else:
    #         return "User not found"
        
    # @staticmethod
    # def get_subs_id(user_id: int):
    #     result = (
    #         db.query(models.User)
    #         .filter(models.User.id == user_id)
    #         .first()
    #     )
    #     PTs_id=[]
    #     print("func->get_subs_id ______ result: ",result)
    #     if result:
    #         PTs_id = [sub.personal_trainer_id for sub in result.subscriptions]
    #         print("PTs_id: ",PTs_id)
    #     return PTs_id

    @staticmethod
    def getAccessibleVideos(user_id: int) -> Optional[List[models.Video]]:
        videos = VideosRepository.getUnrestrictedVideos()
        # print("UnrestrictedVideos: ")
        # for vid in videos:
        #     video = {key: value for key, value in vid.__dict__.items() if key != '_sa_instance_state'}
        #     print(video)

        PTs_id = SubscriptionsRepository.get_pt_ids_for_user(user_id)
        if PTs_id != []:
            for id in PTs_id:
                video = VideosRepository.getPtPrivVideos(id)
                if video != None:
                    videos += video

        return videos

    @staticmethod
    def checkAccessToVideo(videoname: str):
        user_id = 3
        #user_id = db.query(models.User.user_id).filter(models.User.token==token).first()   
        print("user_id",user_id)
        videos = UsersRepository.getAccessibleVideos(user_id)
        print(videos)
        if videos:
            for video in videos:

                #video = video[0]    # video é por exemplo ('./video/pullUps.mp4',), por isso é que preciso de ir buscar o primeiro elemento
                print("current video: ",video.videopath)
                if videoname in video.videopath:
                    print("found")
                    return True
        return False

    @staticmethod
    def logIn(user: models.User) -> str:
        # check if user already has a token
        if UsersRepository.get_user_by_username_password(user.username, user.password).token != None:
            jwt_token: str = create_jwt_access_token({ "token": user.token, "isNormalUser": True })
            return jwt_token

        # generate the new token for the user
        token = ''.join(random.choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(12))
        while len(db.query(models.User).filter(models.User.token == token).all()) > 0:
            token = ''.join(random.choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(12))

        # assign the new token and update the db
        user.token = token
        db.commit()

        jwt_token: str = create_jwt_access_token({ "token": token, "isNormalUser": True })
        return jwt_token

    @staticmethod
    def logOut():
        pass

    @staticmethod
    def validToken():
        pass
