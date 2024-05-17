# student_lessons = db.Table(
#     "student_lessons",
#     db.Column(
#         "student_id",
#         db.Integer,
#         db.ForeignKey("students.id"),
#         primary_key=True
#     ),
#     db.Column(
#         "lesson_id",
#         db.Integer,
#         db.ForeignKey("lessons.id"),
#         primary_key=True
#     )
# )

from .db import db, add_prefix_for_prod
from sqlalchemy import Column, Integer, String,  ForeignKey, Boolean



server_membership= db.Table(
    "server_memberships",
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

channel_membership= db.Table(
    "channel_memberships",
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
