from sqlalchemy.orm import relationship, backref
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from .membership_tables import channel_membership
from datetime import datetime


class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = Column(Integer, primary_key=True)
    name = Column(String(40), nullable=False)
    serverId = Column(
        Integer, ForeignKey(add_prefix_for_prod("servers.id"), ondelete="CASCADE"), nullable=False
    )
    creatorId = Column(
        Integer, ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False
    )
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship(
        "User",
        secondary=channel_membership,
        back_populates="channel_memberships",
    )

    messages = relationship(
        "Message", back_populates="channel", cascade="all, delete-orphan"
    )

    server = relationship("Server", back_populates="channels")

    # server = relationship('Server', backref=backref('channels', lazy=True))
    # creator = relationship('User', backref=backref('created_channels', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'serverId': self.serverId,
            'creatorId': self.creatorId,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
