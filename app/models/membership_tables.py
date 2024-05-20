from .db import db, add_prefix_for_prod
from sqlalchemy import Column, Integer, String,  ForeignKey, Boolean
from app.models import environment, SCHEMA

if environment == "production":
    db.Model.metadata.schema = SCHEMA

server_membership = db.Table(
    "server_memberships",
    db.Model.metadata,
    Column(
        "user_id",
        Integer,
        ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    ),
    Column(
        "server_id",
        Integer,
        ForeignKey(add_prefix_for_prod("servers.id")),
        primary_key=True
    )
)

channel_membership = db.Table(
    "channel_memberships",
    db.Model.metadata,
    Column(
        "user_id",
        Integer,
        ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    ),
    Column(
        "channel_id",
        Integer,
        ForeignKey(add_prefix_for_prod("channels.id")),
        primary_key=True
    )
)
