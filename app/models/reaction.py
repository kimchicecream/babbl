from sqlalchemy.orm import relationship, backref
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime


class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    messageId = Column(Integer, ForeignKey(add_prefix_for_prod('messages.id')), nullable=False)
    userId = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    emojiId = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    message = relationship('Message', backref=backref('reactions', lazy=True))
    user = relationship('User', backref=backref('reactions', lazy=True))
