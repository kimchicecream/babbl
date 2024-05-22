from app.models import db, Reaction, environment, SCHEMA
from sqlalchemy.sql import text
def seed_reactions():
    reactions =[
        Reaction(
            userId=2,
            messageId=1,
            emojiId=2,
        ),
        Reaction(
            userId=1,
            messageId=7,
            emojiId=7,
        ),
        Reaction(
            userId=3,
            messageId=3,
            emojiId=1,
        ),
        Reaction(
            userId=2,
            messageId=7,
            emojiId=9,
        ),
        Reaction(
            userId=1,
            messageId=8,
            emojiId=5,
        ),
        Reaction(
            userId=3,
            messageId=1,
            emojiId=1,
        ),
        Reaction(
            userId=2,
            messageId=2,
            emojiId=4,
        ),
        Reaction(
            userId=2,
            messageId=4,
            emojiId=7,
        ),
        Reaction(
            userId=2,
            messageId=2,
            emojiId=4,
        ),

    ]
    db.session.add_all(reactions)
    db.session.commit()

def undo_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))
    db.session.commit()
