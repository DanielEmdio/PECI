from typing import List, Optional
from database import db
import models

class WorkoutsRepository():
    @staticmethod
    def getWorkout(workout_id: int) -> Optional[models.Workout]:
        return db.query(models.Workout).filter(models.Workout.id == workout_id).first()

    @staticmethod
    def getUnrestrictedWorkouts() -> List[models.Workout]:
        return db.query(models.Workout).filter(models.Workout.premium == 0).all()
    
    @staticmethod
    def getPtPrivWorkouts(pt_id: str) -> Optional[List[models.Workout]]:
        return db.query(models.Workout).filter(models.Workout.personal_trainer_id == pt_id, models.Workout.premium == 1).all()
        
        # exercises_id = db.query(models.Exercise).filter(models.Exercise.personal_trainer_id == pt_id).all()

        # if exercises_id:
        #     workouts_id = [exercise.workout_id for exercise in exercises_id]   
        #     workouts = result.workouts
        #     workouts = [vid for vid in workouts if vid.restricted == 1]
        #     return workouts
        # else:
        #     return None

    @staticmethod
    def getPtWorkouts(pt_id:str) -> Optional[List[models.Exercise]]:   # getPtExercises -> getPtVideos
        return db.query(models.Workout).filter(models.Workout.personal_trainer_id==pt_id).all()
        # personal_trainer = db.query(models.PersonalTrainer).filter(models.PersonalTrainer.id == pt_id).first()
        # return personal_trainer.workouts if personal_trainer else None

    @staticmethod
    def getAllRestrictedWorkouts():
        pass

    @staticmethod
    def getAllWorkoutsFromPt(ptId):
        pass
