from app.models import (
    db,
    environment,
    SCHEMA,
    channel_membership,
)

data = [
    {"user_id": 1, "channel_id": 1},
    {"user_id": 1, "channel_id": 2},
    {"user_id": 1, "channel_id": 3},
    {"user_id": 1, "channel_id": 4},
    {"user_id": 1, "channel_id": 5},
    {"user_id": 1, "channel_id": 6},
    {"user_id": 1, "channel_id": 7},
    {"user_id": 2, "channel_id": 1},
    {"user_id": 2, "channel_id": 2},
    {"user_id": 2, "channel_id": 3},
    {"user_id": 2, "channel_id": 4},
    {"user_id": 2, "channel_id": 5},
    {"user_id": 2, "channel_id": 6},
    {"user_id": 2, "channel_id": 7},
    {"user_id": 3, "channel_id": 1},
    {"user_id": 3, "channel_id": 2},
    {"user_id": 3, "channel_id": 3},
    {"user_id": 3, "channel_id": 4},
    {"user_id": 3, "channel_id": 5},
    {"user_id": 3, "channel_id": 6},
    {"user_id": 3, "channel_id": 7},
]

def seed_channel_memberships():
    if environment == 'production':
        for datum in data:
            db.session.execute(SCHEMA.channel_membership.insert().values(**datum))
    else:
        for datum in data:
            db.session.execute(channel_membership.insert().values(**datum))
    db.session.commit()

def undo_channel_memberships():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.query(channel_membership).delete()
    db.session.commit()
