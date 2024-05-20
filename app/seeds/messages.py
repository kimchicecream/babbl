from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

def seed_messages():
    messages = [
        Message(
            userId=1,
            channelId=1,
            message="Why did the scarecrow win an award? Because he was outstanding in his field!",
        ),
        Message(
            userId=2,
            channelId=1,
            message="I told my wife she was drawing her eyebrows too high. She looked surprised.",
        ),
        Message(
            userId=3,
            channelId=1,
            message="Why don't scientists trust atoms? Because they make up everything!",
        ),
        Message(
            userId=1,
            channelId=6,
            message="Parallel lines have so much in common. It's a shame they'll never meet.",
        ),
        Message(
            userId=3,
            channelId=6,
            message="Why couldn't the bicycle stand up by itself? It was two tired.",
        ),
        Message(
            userId=3,
            channelId=6,
            message="I'm reading a book on anti-gravity. It's impossible to put down!",
        ),
        Message(
            userId=1,
            channelId=6,
            message="Why did the tomato turn red? Because it saw the salad dressing!",
        ),
        Message(
            userId=3,
            channelId=6,
            message="I used to play piano by ear, but now I use my hands.",
        ),
        Message(
            userId=1,
            channelId=7,
            message="What's orange and sounds like a parrot? A carrot!",
        ),
        Message(
            userId=3,
            channelId=7,
            message="I'm reading a book about anti-gravity. It's uplifting!",
        ),
        Message(
            userId=2,
            channelId=1,
            message="I'm on a whiskey diet. I've lost three pounds already!",
        ),
        Message(
            userId=2,
            channelId=1,
            message="Why did the golfer bring two pairs of pants? In case he got a hole in one!",
        ),
        Message(
            userId=2,
            channelId=1,
            message="I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        ),
        Message(
            userId=3,
            channelId=1,
            message="Why don't skeletons fight each other? They don't have the guts!",
        ),
        Message(
            userId=3,
            channelId=1,
            message="I'm trying to organize a hide and seek tournament, but it's hard to find good players.",
        ),
    ]
    
    db.session.add_all(messages)
    db.session.commit()
    
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))
    db.session.commit()