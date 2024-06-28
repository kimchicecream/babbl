from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text

def seed_servers():
    servers = [
        Server(
            name='MineCraft 4EVERRRRR',
            creatorId=1,
            description='Lovers of Minecraft rejoice!!!',
            imageUrl='https://flightbook1may2024.s3.us-east-2.amazonaws.com/minecraft.png'
        ),
        Server(
            name='League of Legends Forever',
            creatorId=1,
            description='Join us for epic battles in LoL!',
            imageUrl='https://i.scdn.co/image/ab6761610000e5ebe80d1ffb81aa6503ad41c574'
        ),
        Server(
            name='Among Us Party',
            creatorId=1,
            description='Find the impostor among us!',
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3p2zjGV5bKEMt2F3niChdG2BbLV0TmQcLySeexXhmOg&s'
        ),
        Server(
            name='Fortnite Fanatics',
            creatorId=1,
            description='Drop in and join the Fortnite frenzy!',
            imageUrl='https://yt3.googleusercontent.com/o5_XZSJFSkVJ4cRUIOGkuM6aTqoF1YjTlxsZ--IJyDhQHUGIr7w9DJK2iz7qhBnYGfS2Fv5p=s900-c-k-c0x00ffffff-no-rj'
        ),
        Server(
            name='Call of Duty Crew',
            creatorId=1,
            description='Join us for some CoD action!',
            imageUrl='https://yt3.googleusercontent.com/Wz_UJUsKf5PQzlWBhSf0VfshMQbahqDf6byz2uXcSEp9L5nseaCqiYWoagrYjDs3tIOVUqbYRSM=s900-c-k-c0x00ffffff-no-rj'
        )
    ]

    db.session.add_all(servers)
    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))
    db.session.commit()
