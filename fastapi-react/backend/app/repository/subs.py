from database import db
# from sqlalchemy.orm import joinedload
import models, schemas

class SubscriptionsRepository():
    @staticmethod
    def create(sub: schemas.SubscriptionCreate):
        db_sub = models.Subscription(user_id=sub.user_id,personal_trainer_id=sub.personal_trainer_id)
        db.add(db_sub)
        db.commit()
        db.refresh(db_sub)
        return db_sub

    @staticmethod
    def get_pts_for_user(user_id: int):     # retrieve all personal_trainers to which the user is subscribed to
        subscriptions = (
            db.query(models.Subscription)
            .filter(models.Subscription.user_id == user_id)
            .all()
        )

        if subscriptions:
            personal_trainers = [sub.personal_trainer for sub in subscriptions]
            return personal_trainers
        else:
            return "User not found"

    @staticmethod
    def get_pt_ids_for_user(user_id: int):
        result = (
            db.query(models.User)
            .filter(models.User.id == user_id)
            .first()
        )

        PTs_id = []
        print("func->get_subs_id ______ result: ",result)
        if result:
            PTs_id = [sub.personal_trainer_id for sub in result.subscriptions]
            print("PTs_id: ",PTs_id)
        return PTs_id

    @staticmethod
    def get_user_ids_for_pt(pt_id: int):
        result = (
            db.query(models.PersonalTrainer)
            .filter(models.PersonalTrainer.id == pt_id)
            .first()
        )

        users_id = []
        print("func->get_subs_id ______ result: ",result)
        if result:
            users_id = [sub.user_id for sub in result.subscriptions]
            print("users_id: ",users_id)
        return users_id
