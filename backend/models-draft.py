from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Enum, DECIMAL, Boolean, ForeignKey
from sqlalchemy.orm import relationship, backref

db = SQLAlchemy()

# backref or back_populates can be used. They do the same thing
    # backref is used for simplicty. used when we dont need fine grained control over the relationships
        # backref automatically creates a back-reference in the related model
        # essentially a shortcut that allows you to define the relationship on one side (SQLAlchemy automatically creates the corresponding relationship on the other side)
    # back_populates is used for explicity control and when dealing with more complex relationships. allows us to customize the relationship behavior in specific ways.
        # requres you to explicity define the relationship on both sides. more verbose but provides more control and clarity

# lazy=True is used in relationships to specifiy how SQLAlchemy should load. In this case, related objects will be loaded on access

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    hashedPassword = Column(String, nullable=False)
    imageUrl = Column(String)

class Server(db.Model):
    __tablename__ = 'servers'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    creatorId = Column(Integer, ForeignKey('users.id'), nullable=False)
    description = Column(String(2000))
    imageUrl = Column(String)

    creator = relationship('User', backref=backref('created_servers', lazy=True))

class Channel(db.Model):
    __tablename__ = 'channels'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    serverId = Column(Integer, ForeignKey('servers.id'), nullable=False)
    creatorId = Column(Integer, ForeignKey('users.id'), nullable=False)

    server = relationship('Server', backref=backref('channels', lazy=True))
    creator = relationship('User', backref=backref('created_channels', lazy=True))

class Message(db.Model):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    userId = Column(Integer, ForeignKey('users.id'), nullable=False)
    channelId = Column(Integer, ForeignKey('channels.id'), nullable=False)
    imageUrl = Column(String)
    isEdited = Column(Boolean, default=False)

    user = relationship('User', backref=backref('messages', lazy=True))
    channel = relationship('Channel', backref=backref('messages', lazy=True))

class Reaction(db.Model):
    __tablename__ = 'reactions'

    id = Column(Integer, primary_key=True)
    messageId = Column(Integer, ForeignKey('messages.id'), nullable=False)
    userId = Column(Integer, ForeignKey('users.id'), nullable=False)
    emojiId = Column(Integer, nullable=False)

    message = relationship('Message', backref=backref('reactions', lazy=True))
    user = relationship('User', backref=backref('reactions', lazy=True))

class ServerMembership(db.Model):
    __tablename__ = 'server_memberships'

    id = Column(Integer, primary_key=True)
    userId = Column(Integer, ForeignKey('users.id'), nullable=False)
    serverId = Column(Integer, ForeignKey('servers.id'), nullable=False)

    user = relationship('User', backref=backref('server_memberships', lazy=True))
    server = relationship('Server', backref=backref('memberships', lazy=True))

class ChannelMembership(db.Model):
    __tablename__ = 'channel_memberships'

    id = Column(Integer, primary_key=True)
    userId = Column(Integer, ForeignKey('users.id'), nullable=False)
    channelId = Column(Integer, ForeignKey('channels.id'), nullable=False)

    user = relationship('User', backref=backref('channel_memberships', lazy=True))
    channel = relationship('Channel', backref=backref('memberships', lazy=True))
