from sqlalchemy.orm import relationship, backref
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime
from datetime import datetime


class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = Column(Integer, primary_key=True)
    userId = Column(
        Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    channelId = Column(
        Integer, ForeignKey(add_prefix_for_prod("channels.id")), nullable=False
    )
    message = Column(String(4028), nullable=False)
    imageUrl = Column(String(1023))
    isEdited = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    user = relationship("User", backref=backref("messages", lazy=True))
    channel = relationship("Channel", backref=backref("messages", lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "channelId": self.channelId,
            "message": self.message,
            "imageUrl": self.imageUrl,
            "isEdited": self.isEdited,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
