from sqlalchemy.orm import relationship, backref
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, String,  ForeignKey, Boolean


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = Column(Integer, primary_key=True)
    userId = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channelId = Column(Integer, ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    imageUrl = Column(String(1023))
    isEdited = Column(Boolean, default=False)

    user = relationship('User', backref=backref('messages', lazy=True))
    channel = relationship('Channel', backref=backref('messages', lazy=True))
