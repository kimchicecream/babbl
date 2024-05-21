from .db import db, add_prefix_for_prod
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime

server_membership = db.Table(
    "server_memberships",
    db.Model.metadata,
    Column(
        "user_id",
        Integer,
        ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True,
    ),
    Column(
        "server_id",
        Integer,
        ForeignKey(add_prefix_for_prod("servers.id")),
        primary_key=True,
    ),
    Column("created_at", DateTime, default=datetime.now),
    Column("updated_at", DateTime, default=datetime.now, onupdate=datetime.now),
)

channel_membership = db.Table(
    "channel_memberships",
    db.Model.metadata,
    Column(
        "user_id",
        Integer,
        ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True,
    ),
    Column(
        "channel_id",
        Integer,
        ForeignKey(add_prefix_for_prod("channels.id")),
        primary_key=True,
    ),
    Column("created_at", DateTime, default=datetime.now),
    Column("updated_at", DateTime, default=datetime.now, onupdate=datetime.now),
)
