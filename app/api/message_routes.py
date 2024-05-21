from flask import Blueprint, request
from app.models import User, db, Message
#we need to create and import forms for each modal that uses one
#  EXAMPLE from app.forms.server_create mport CreateServerForm
from app.forms.message_create import CreateMessageForm
from flask_login import current_user, login_user, logout_user, login_required

message_routes = Blueprint('messages',__name__)

@message_routes.route('/<int:channelId>')
def get_all_messages_by_channel(channelId):
    messages = Message.query.filter_by(channel_id=channelId).all()
    return [message.to_dict() for message in messages]




@message_routes.route('/<int:channelId>')
def create_message(channelId):
    form = CreateMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        new_message = Message(
            "userId": form.date["userId"]
            "channelId": channelId
            "Message":form.date["message"]
        )
        if form.data["imageUrl"]:
            new_message["imageUrl"] = form.data["imageUrl"]
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()







@message_routes.route('/<int:messageId>/edit')
def edit_message_by_id(messageId):
    message = Message.query.get(messageId)
    form = CreateMessageForm()
    if form.validate_on_submit:
        return "time to party"

@message_routes.route('/<int:messageId>/delete')
def delete_message_by_id(messageId):
    message = Message.query.
