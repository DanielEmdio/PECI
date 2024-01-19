from sqlalchemy.orm import Session

import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.Users).filter(models.Users.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.Users).filter(models.Users.username == username).first()


def get_pt(db: Session, pt_id: int):
    return db.query(models.PTs).filter(models.PTs.id == pt_id).first()


def get_pt_by_username(db: Session, username: str):
    return db.query(models.PTs).filter(models.PTs.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.Users(token="",username=user.username, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_pt(db: Session, PT: schemas.PTCreate):
    db_pt = models.PTs(token="",pt=PT.pt, password=PT.password)
    db.add(db_pt)
    db.commit()
    db.refresh(db_pt)
    return db_pt


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Users).offset(skip).limit(limit).all()






