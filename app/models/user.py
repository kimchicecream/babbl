from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, Enum, DECIMAL, Boolean, ForeignKey
from .membership_tables import server_membership, channel_membership


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    firstName = Column(String(50), nullable=False)
    lastName = Column(String(50), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    username = Column(String(40), unique=True, nullable=False)
    hashedPassword = Column(String(255), nullable=False)
    imageUrl = Column(String(1023))


    servers = db.relationship(
        "Server",
        secondary=server_membership,
        back_populates="users"
    )

    channels = db.relationship(
        "Channel",
        secondary = channel_membership,
        back_populates = "users"
    )

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashedPassword, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
