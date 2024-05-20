from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text

def seed_servers():
    servers = [
        Server(
            name='MineCraft 4EVERRRRR',
            creatorId=1,
            description='Lovers of Minecraft rejoice!!!',
            imageUrl='https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg'
        ),
        Server(
            name='League of Legends Forever',
            creatorId=2,
            description='Join us for epic battles in LoL!',
            imageUrl='https://images.pexels.com/photos/1763434/pexels-photo-1763434.jpeg'
        ),
        Server(
            name='Among Us Party',
            creatorId=3,
            description='Find the impostor among us!',
            imageUrl='https://images.pexels.com/photos/4388160/pexels-photo-4388160.jpeg'
        ),
        Server(
            name='Fortnite Fanatics',
            creatorId=1,
            description='Drop in and join the Fortnite frenzy!',
            imageUrl='https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg'
        ),
        Server(
            name='Call of Duty Crew',
            creatorId=2,
            description='Join us for some CoD action!',
            imageUrl='https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg'
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
