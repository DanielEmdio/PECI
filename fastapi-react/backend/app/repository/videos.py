from typing import List, Optional
from database import db
import models, schemas

class VideosRepository():
    @staticmethod
    def create(video: schemas.VideoCreate) -> schemas.VideoCreate: # ESTA FUNÇÃO NÃO ASSOCIA O VIDEO AO PT 
        db_video = video
        db.add(db_video)
        db.commit()
        db.refresh(db_video)
        return db_video

    @staticmethod
    def getUnrestrictedVideos() -> List[models.Video]:
        return db.query(models.Video).filter(models.Video.restricted == 0).all()

    @staticmethod
    def getAllVideos(skip: int = 0, limit: int = 100) -> List[models.Video]:
        return db.query(models.Video).offset(skip).limit(limit).all()

    @staticmethod
    def getPtVideos(pt_id:str) -> Optional[List[models.Video]]:
        personal_trainer = db.query(models.PersonalTrainer).filter(models.PersonalTrainer.id == pt_id).first()
        return personal_trainer.workouts if personal_trainer else None

    @staticmethod
    def getPtPrivVideos(pt_id: str) -> Optional[List[models.Video]]:
        result = db.query(models.PersonalTrainer).filter(models.PersonalTrainer.id == pt_id).first()

        if result:
            videos = result.workouts
            videos = [vid for vid in videos if vid.restricted == 1]
            return videos
        else:
            return None

    @staticmethod
    def getAllRestrictedVideos():
        pass

    @staticmethod
    def getAllVideosFromPt(ptId):
        pass
