from repository.pts import PersonalTrainersRepository
from fastapi import APIRouter, UploadFile, File, Cookie
from repository.users import UsersRepository
from repository.exercises import ExercisesRepository
from repository.workouts import WorkoutsRepository
from fastapi.responses import FileResponse
from auth.oauth2_jwt import *
import schemas
from typing import Annotated

router = APIRouter(prefix="/workouts")


@router.post("/getAccessibleWorkouts")
def get_accessible_workouts(token: schemas.TokenData):
    jwt_data: Optional[str] = get_jwt_token_data(token=token.token)
    if jwt_data == None:
        return { "result": "no", "error": "Unauthorized." }

    if jwt_data["isNormalUser"] == True:
        user: int = UsersRepository.get_user_by_token(token=jwt_data["token"])
        if user == None:
            return { "result": "no", "error": "Unauthorized." }

        # retrieve the workouts that the user has access to
        workouts = UsersRepository.getAccessibleWorkouts(user.id)
    else:
        pt: int = PersonalTrainersRepository.get_pt_by_token(token=jwt_data["token"])
        if pt == None:
            return { "result": "no", "error": "Unauthorized." }

        workouts = PersonalTrainersRepository.getAccessibleWorkouts(pt.id)
    print(workouts)
    if workouts == None:
        return { "result": "ok", "workouts": [] }

    workouts = [ {"id":workout.id,"title": workout.title, "thumbnail": workout.thumbnail, "rating": workout.rating,"releasedate": workout.releasedate} for workout in workouts]
    return { "result": "ok", "workouts": workouts }


@router.post("/getPTPreWorkouts")
async def get_pt_premium_workouts(token: schemas.TokenData):
    jwt_data: Optional[str] = get_jwt_token_data(token=token.token)
    if jwt_data == None:
        return { "result": "no", "error": "Unauthorized." }

    if jwt_data["isNormalUser"] == True:
        user_id: int = UsersRepository.get_user_by_token(token=jwt_data["token"]).id
        #print("user_id",user_id)
        if user_id == None:
            return { "result": "no", "error": "Unauthorized." }

        # retrieve the premium workouts that the user has access to
        workouts = UsersRepository.getPTWorkouts(user_id)
    else:
        pt_id: int = PersonalTrainersRepository.get_pt_by_token(token=jwt_data["token"]).id
        if pt_id == None:
            return { "result": "no", "error": "Unauthorized." }

        workouts = PersonalTrainersRepository.getPTPrivWorkouts(pt_id)
    
    # sort the workouts by personal trainer id
    workouts = sorted(workouts, key=lambda workout: workout.personal_trainer_id)
    #print("workouts",workouts)
    #print("workout.pt_username",workouts[0].pt_username)
    
    workouts = [ {"id":workout.id,"title": workout.title, "tags": workout.tags, "thumbnail": workout.thumbnail, "username": workout.pt_username ,"releasedate": workout.releasedate, "rating": workout.rating} for workout in workouts]
    
    # depois de dar update á db deverá ficar este:
    #workouts = [ {"title": workout.workoutname, "mainMuscles": workout.muscletargets, "rating": workout.rating, "duration": workout.duration, "thumbnail": workout.thumbnail, "dificulty": workout.dificulty, "releasedate": workout.releasedate} for workout in workouts if workout.restricted == 1]


    return { "result": "ok", "workouts": workouts if workouts != None else [] }


@router.post("/getPTworkouts/{pt_id}")
async def read_root3(pt_id: int):
    workouts = WorkoutsRepository.getPtWorkouts(pt_id)
    if workouts != None:
        workouts = [ {"id":workout.id,"title": workout.title,"tags":workout.tags, "thumbnail": workout.thumbnail,"releasedate": workout.releasedate} for workout in workouts]
        print(workouts)
        return { "result": "ok", "workouts": workouts if workouts != None else [] }
    return { "result": "no", "error": "Unauthorized" }


@router.post("/getWorkoutInfo")        # ESTA FUNÇÃO NÃO FILTRA A INFORMAÇÃO DO VÍDEO.
async def get_workout_info( token: schemas.TokenData,workout_id:int):
    jwt_data = get_jwt_token_data(token=token.token)
    if jwt_data == None:
        return { "result": "no", "error": "Unauthorized." }

    if jwt_data["isNormalUser"] == True:
        user_id: int = UsersRepository.get_user_by_token(token=jwt_data["token"]).id
        workout = WorkoutsRepository.getWorkout(workout_id)
        if not UsersRepository.hasAccessToWorkout(user_id, workout.title):
            return { "result": "no", "error": "Unauthorized." }
    else:
        pt_id: int = PersonalTrainersRepository.get_pt_by_token(token=token).id
        workout = WorkoutsRepository.getWorkout(workout_id)
        if not PersonalTrainersRepository.hasAccessToWorkout(pt_id, workout.title):
            return { "result": "no", "error": "Unauthorized." }
        
    return {"result":"ok","workout":workout}

    

