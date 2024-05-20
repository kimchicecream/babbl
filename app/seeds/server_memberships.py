from app.models import (
    db,
    environment,
    SCHEMA,
    server_membership,
)

data = [
    {"user_id": 1, "server_id": 1},
    {"user_id": 1, "server_id": 2},
    {"user_id": 1, "server_id": 3},
    {"user_id": 1, "server_id": 4},
    {"user_id": 1, "server_id": 5},
    {"user_id": 2, "server_id": 1},
    {"user_id": 2, "server_id": 2},
    {"user_id": 2, "server_id": 3},
    {"user_id": 2, "server_id": 4},
    {"user_id": 2, "server_id": 5},
    {"user_id": 3, "server_id": 1},
    {"user_id": 3, "server_id": 2},
    {"user_id": 3, "server_id": 3},
    {"user_id": 3, "server_id": 4},
    {"user_id": 3, "server_id": 5},
]

def seed_server_memberships():
    if environment == 'production':
        for datum in data:
            db.session.execute(SCHEMA.server_membership.insert().values(**datum))
    else:
        for datum in data:
            db.session.execute(server_membership.insert().values(**datum))

def undo_server_memberships():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.query(server_membership).filter().delete()
    db.session.commit()
