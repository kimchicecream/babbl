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
            userId = data["user"]["id"],
            channelId = data["channelId"],
            message = data["msg"]
        )
    db.session.add(message)
    db.session.commit()
    data["id"] = message.id
    print("data !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", data)
    emit("chat", data, broadcast=True)


@socketio.on("server")
def _update(data):

    emit("server", data, broadcast=True)
