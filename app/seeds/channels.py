from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    channels = [
        Channel(
            name="General",
            serverId=1,
            creatorId=1,

        ),
        Channel(
            name="General",
            serverId=2,
            creatorId=2,

        ),
        Channel(
            name="General",
            serverId=3,
            creatorId=3,

        ),
        Channel(
            name="General",
            serverId=4,
            creatorId=1,

        ),
        Channel(
            name="General",
            serverId=5,
            creatorId=2,

        ),
        Channel(
            name="Mine craft... more like YOUR craft",
            serverId=1,
            creatorId=1,

        ),

        Channel(
            name="minecraft unionization effort",
            serverId=1,
            creatorId=1,

        ),
    ]


    db.session.add_all(channels)
    db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))
    db.session.commit()
