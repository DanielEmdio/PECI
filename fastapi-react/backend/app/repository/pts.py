# from sqlalchemy.orm import joinedload
from database import db
import models, schemas

class PersonalTrainersRepository():
    @staticmethod
    def create(PT: schemas.PersonalTrainerCreate):
        db_pt = models.PersonalTrainer(token="",username=PT.username, password=PT.password)
        db.add(db_pt)
        db.commit()
        db.refresh(db_pt)
        return db_pt

    @staticmethod
    def get_pt(pt_id: int):
        return db.query(models.PersonalTrainer).filter(models.PersonalTrainer.id == pt_id).first()

    @staticmethod
    def get_pt_by_username(username: str):  # retorna o username e o token 
        return db.query(models.PersonalTrainer).filter(models.PersonalTrainer.username == username).first()
    
    @staticmethod
    def get_pt_username_token(pt_id: str):  # retorna o username e o token 
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
    def logIn():
        pass

    @staticmethod
    def logOut():
        pass

    # @staticmethod
    # def validToken():
    #     pass
