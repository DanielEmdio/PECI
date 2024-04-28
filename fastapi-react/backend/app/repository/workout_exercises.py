from typing import List, Optional
from database import db
import models, schemas
from repository.exercises import ExercisesRepository

class WorkoutExercisesRepository():
    
    @staticmethod
    def getExercisesForWorkout(workout_id: int) -> List[models.WorkoutExercise]:
        # get the exercises_id for the workout
        # exercises_id = db.query(models.WorkoutExercise).filter(models.WorkoutExercise.workout_id == workout_id).all()
        # exercises = []
        # for exercise in exercises_id:
        #     exercises.append(ExercisesRepository.getExercise(exercise.exercise_id))
        # return exercises


        return db.query(models.Exercise).join(models.WorkoutExercise).filter(models.WorkoutExercise.exercise_id == models.Exercise.id).all()

    

    