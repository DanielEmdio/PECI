from repository.users import UsersRepository
from fastapi import APIRouter
from typing import Tuple
import schemas

router = APIRouter(prefix="/users")

def check_password_requirements(password: str) -> Tuple[bool, str]:
    special_chars =  ["$", "&", "!"]
    if len(password) < 12 or len(password) > 128:
        return(False, "The password length needs to be in between 12 and 128 characters.")
    elif not any(char.isdigit() for char in password) :
        return(False, "The password needs at least one digit.")
    elif not any(char.isupper() for char in password):
        return(False, "The password needs at least one uppercase letter.")
    elif not any(char.islower() for char in password):
        return(False, "The password needs at least one lowercase letter.")
    elif not any(char in special_chars for char in password):
        return(False, 'The passwords needs at least one of these characters: "$", "&", "!"')
    else: 
        return (True, "")

@router.post("/register")
def register_user(user: schemas.BasicUser):
    # check for user with same name
    if UsersRepository.get_user_by_username(username=user.username):
        return {"result": "no", "error": "Username already in use."}

    # check password strength
    passwd_req = check_password_requirements(user.password)
    if passwd_req[0] == False:
        return {"result": "no", "error": passwd_req[1]}

    # register the user in the database
    new_user = UsersRepository.create(user=user)

    # login the new user
    token = UsersRepository.logIn(new_user)

    return {"result": "ok", "token": token}

@router.post("/login")
def login_user(user: schemas.BasicUser):
    # get the user instance with the provided username and password
    user_login = UsersRepository.get_user_by_username_password(**user.model_dump())
    if not user_login:
        return {"result": "no", "error": "User does not exist."}

    # login the user
    token = UsersRepository.logIn(user_login)

    return {"result": "ok", "token": token}
