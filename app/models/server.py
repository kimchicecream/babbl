from sqlalchemy.orm import relationship, backref
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, String,  ForeignKey
from .membership_tables import server_membership



class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    name = Column(String(40), nullable=False)
    creatorId = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    description = Column(String(2000))
    imageUrl = Column(String(1023))

    creator = relationship('User', backref=backref('created_servers', lazy=True))

    users = db.relationship(
        "User",
        secondary=server_membership,
        back_populates="servers"
    )
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'creatorId': self.creatorId,
            'description': self.description,
            'imageUrl': self.imageUrl
        }
