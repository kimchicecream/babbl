from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime


class Reaction(db.Model):
    __tablename__ = "reactions"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = Column(Integer, primary_key=True)
    messageId = Column(
        Integer, ForeignKey(add_prefix_for_prod("messages.id"), ondelete="CASCADE"), nullable=False
    )
    userId = Column(
        Integer, ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False
    )
    emojiId = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    message = relationship("Message", back_populates="reactions")
    user = relationship("User", back_populates="reactions")

    def to_dict(self):
        return {
            "id": self.id,
            "messageId": self.messageId,
            "userId": self.userId,
            "emojiId": self.emojiId,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def for_message(self):
        return {
            "emojiId":self.emojiId,
            "id":self.id,
            "messageId": self.messageId,
            "userId": self.userId
        }
