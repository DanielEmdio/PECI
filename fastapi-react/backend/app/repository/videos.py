from database import db
import models, schemas

class VideosRepository():
    @staticmethod
    def getUnrestrictedVideos():
        return db.query(models.Video).filter(models.Video.restricted == 0).all()
        pass

    @staticmethod
    def getAllVideos(skip: int = 0, limit: int = 100):
        return db.query(models.Video).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_pt_videos(pt_id:str):
        personal_trainer = (
            db.query(models.PersonalTrainer)
            .filter(models.PersonalTrainer.id == pt_id)
            .first()
        )
        if personal_trainer:
            videos = personal_trainer.workouts
            return videos
        else:
            return None
        
    @staticmethod
    def get_pt_priv_videos(pt_id:str):
        result = (
            db.query(models.PersonalTrainer)
            .filter(models.PersonalTrainer.id == pt_id)
            .first()
        )
        if result:
            videos = result.workouts
            videos = [vid for vid in videos if vid.restricted==1]
            return videos
        else:
            return None

    @staticmethod
    def getAllRestrictedVideos():
        pass

    @staticmethod
    def getAllVideosFromPt(ptId):
        pass
