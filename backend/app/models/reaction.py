from sqlalchemy.orm import relationship, backref
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, String,  ForeignKey, Boolean



class Reaction(db.Model):
    __tablename__ = 'reactions'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = Column(Integer, primary_key=True)
    messageId = Column(Integer, ForeignKey(add_prefix_for_prod('messages.id')), nullable=False)
    userId = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    emojiId = Column(Integer, nullable=False)

    message = relationship('Message', backref=backref('reactions', lazy=True))
    user = relationship('User', backref=backref('reactions', lazy=True))
