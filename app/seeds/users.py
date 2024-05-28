from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', firstName='Bruce', lastName='Wayne', imageUrl='')
    tina = User(
        username='Tina', email='tina@aa.io', password='password', firstName='Tina', lastName='G', imageUrl='https://i.postimg.cc/Jh3tmDy9/Tina.jpg')
    bobbie = User(
        username='Bobby', email='bobby@aa.io', password='password', firstName='Bobby', lastName='S', imageUrl='https://i.postimg.cc/j5Z5wp4c/Bobby.jpg')
    chris = User(
        username='Chris', email='chris@aa.io', password='password', firstName='Chris', lastName='P', imageUrl='https://scontent-lax3-1.xx.fbcdn.net/v/t1.18169-9/29133197_1569947729793609_6420848725298898388_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=8I6j9FKTzOgQ7kNvgEyThH-&_nc_ht=scontent-lax3-1.xx&oh=00_AYBwDhjAXxESJOtcB70ONkMtc47nm4fUYnbbK4Pz5dCkSg&oe=66765878')
    alex = User(
        username='Alex', email='alex@aa.io', password='password', firstName='Alex', lastName='G', imageUrl='https://i.postimg.cc/PJJqmS6j/Alex.png')

    db.session.add(demo)
    db.session.add(chris)
    db.session.add(bobbie)
    db.session.add(tina)
    db.session.add(alex)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
