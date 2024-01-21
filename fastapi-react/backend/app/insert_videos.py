from sqlalchemy.orm import Session
from models import Video  # Import your User model
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

def create_video(db: Session,video: Video):
    db_video = video
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

def main():
    

    # Insert users interactively
    db.init()
    
    while True:
        video = input("enter video: ")
        if video.lower() == 'exit':
            break
        video = video.split("','")
        video[0]=video[0][1:]   # tirar a plica do inicio da string
        last2parameters=video[-1].split("',") # ler o ultimo parametro
        video.pop()
        video+= last2parameters
        print(video)
        
        video_class = Video(videopath=video[0],videoname=video[1],description=video[2],muscletargets=video[3],releasedate=video[4],restricted=int(video[5]))
        create_video(db, video_class)
        print(f"video '{video[1]}' inserted into the database.")

    db.close()

if __name__ == "__main__":
    main()
