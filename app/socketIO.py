from .models import db, Message
from flask_socketio import SocketIO, emit
import os

# configure cors_allowed_origins
if os.environ.get("FLASK_ENV") == "production":
    origins = ["http://babbl.onrender.com", "https://babbl.onrender.com"]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):

    message = Message(
        userId=data["user"]["id"], channelId=data["channelId"], message=data["msg"]
    )
    db.session.add(message)
    db.session.commit()
    data["id"] = message.id
    emit("chat", data, broadcast=True)


@socketio.on("server")
def _update(data):

    emit("server", data, broadcast=True)


@socketio.on("delete_server")
def handle_delete_server(data):
    emit("delete_server", data, broadcast=True)


# handle channel creation
@socketio.on("create_channel")
def handle_create_channel(data):
    emit("create_channel", data, broadcast=True)


# handle channel update
@socketio.on("update_channel")
def handle_update_channel(data):
    emit("update_channel", data, broadcast=True)


# handle channel deletion
@socketio.on("delete_channel")
def handle_delete_channel(data):
    emit("delete_channel", data, broadcast=True)


@socketio.on("edit_message")
def handle_edit_message(data):
    emit("edit_message", data, broadcast=True)


@socketio.on("delete_message")
def handle_delete_message(data):
    emit("delete_message", data, broadcast=True)


@socketio.on("create_reaction")
def handle_create_reaction(data):
    emit("create_reaction", data, broadcast=True)


@socketio.on("delete_reaction")
def handle_delete_reaction(data):
    emit("delete_reaction", data, broadcast=True)
