from sqlalchemy.orm import Session

import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_pt(db: Session, pt_id: int):
    return db.query(models.PersonalTrainer).filter(models.PersonalTrainer.id == pt_id).first()


def get_pt_by_username(db: Session, username: str):
    return db.query(models.PersonalTrainer).filter(models.PersonalTrainer.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(token="",username=user.username, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_pt(db: Session, PT: schemas.PersonalTrainerCreate):
    db_pt = models.PersonalTrainer(token="",username=PT.username, password=PT.password)
    db.add(db_pt)
    db.commit()
    db.refresh(db_pt)
    return db_pt


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()






