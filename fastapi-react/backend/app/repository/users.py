from database import db
#from sqlalchemy.orm import joinedload
import models, schemas
from repository.pts import PersonalTrainersRepository
from repository.videos import VideosRepository
from repository.subs import SubscriptionsRepository

class UsersRepository():
    @staticmethod
    def create(user: schemas.UserCreate):
        db_user = models.User(token="",username=user.username, password=user.password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def get_user(user_id: int):
        return db.query(models.User).filter(models.User.id == user_id).first()
    
    @staticmethod
    def get_user_by_username(username: str):
        return db.query(models.User).filter(models.User.username == username).first()
    
    @staticmethod
    def get_users(skip: int = 0, limit: int = 100):    # retrieve all users
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
    def get_my_videos(user_id:int):
        videos = VideosRepository.getUnrestrictedVideos()
        print("UnrestrictedVideos: ")
        for vid in videos:
            video = {key: value for key, value in vid.__dict__.items() if key != '_sa_instance_state'}
            print(video)
        print("---------------------------------------------------------------------------")
        PTs_id = SubscriptionsRepository.get_pt_ids_for_user(user_id)
        if PTs_id != []:
            for id in PTs_id:
                video = VideosRepository.get_pt_priv_videos(id)
                if video!=None:
                    videos+=video
        
        return videos
   

    @staticmethod
    def logIn():
        pass

    @staticmethod
    def logOut():
        pass

    @staticmethod
    def validToken():
        pass
