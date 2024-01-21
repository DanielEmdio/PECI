from sqlalchemy.orm import Session
from models import User  # Import your User model
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE = 'postgresql://postgres:postgres@localhost:5432/peci'
Base = declarative_base()

class DatabaseSession():
    def __init__(self):
        self.session = None
        self.engine = None

    def __getattr__(self, name):
        return getattr(self.session, name)

    def init(self):
        self.engine = create_engine(URL_DATABASE)
        Base.metadata.create_all(bind=self.engine)
        self.session = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)()

db = DatabaseSession()

def create_user(db: Session, username: str, password: str):
    db_user = User(username=username, password=password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def main():
    

    # Insert users interactively
    db.init()
    while True:
        username = input("Enter username (or type 'exit' to finish): ")
        if username.lower() == 'exit':
            break
        password = input("Enter password: ")

        create_user(db, username=username, password=password)
        print(f"User '{username}' inserted into the database.")

    db.close()

if __name__ == "__main__":
    main()
