from typing import List, Optional
from database import db
import models, schemas

class WorkoutsRepository():


    @staticmethod
    def getUnrestrictedWorkouts() -> List[models.Workout]:
        return db.query(models.Workout).filter(models.Workout.restricted == 0).all()
    
    """@staticmethod
    def getPtPrivWorkouts(pt_id: str) -> Optional[List[models.Workout]]:
        exercises_id = db.query(models.Exercise).filter(models.Exercise.personal_trainer_id == pt_id).all()

        if exercises_id:
            workouts_id = [exercise.workout_id for exercise in exercises_id]   
            workouts = result.workouts
            workouts = [vid for vid in workouts if vid.restricted == 1]
            return workouts
        else:
            return None
"""