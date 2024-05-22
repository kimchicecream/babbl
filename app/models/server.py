from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from .membership_tables import server_membership
from datetime import datetime


class Server(db.Model):
    __tablename__ = "servers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = Column(Integer, primary_key=True)
    name = Column(String(40), nullable=False)
    creatorId = Column(
        Integer, ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False
    )
    description = Column(String(2000))
    imageUrl = Column(String(1023))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    creator = relationship("User", back_populates='servers')

    users = relationship(
        "User", secondary=server_membership, back_populates="server_memberships"
    )
    
    channels = relationship(
        "Channel", back_populates="server", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "creatorId": self.creatorId,
            "description": self.description,
            "imageUrl": self.imageUrl,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
