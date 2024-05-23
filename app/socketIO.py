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
    db.session.add(
        Message(
            userId = data["user"]["id"],
            channelId = data["channelId"],
            message = data["msg"]
        )
    )
    db.session.commit()

    emit("chat", data, broadcast=True)
