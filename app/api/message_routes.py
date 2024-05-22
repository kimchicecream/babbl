from flask import Blueprint, request
from app.models import User, db, Message
#we need to create and import forms for each modal that uses one
#  EXAMPLE from app.forms.server_create mport CreateServerForm
from app.forms.message_create import CreateMessageForm
from flask_login import current_user, login_user, logout_user, login_required

message_routes = Blueprint('messages',__name__)

@message_routes.route('/<int:channelsId>')
@login_required
def get_all_messages_by_channel(channelsId):

    messages = Message.query.filter_by(channelId=channelsId).all()
    return [message.to_dict() for message in messages]


@message_routes.route('/<int:channelId>/new', methods=["POST", "GET"])
@login_required
def create_message(channelId):
    form = CreateMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        new_message = {
            "userId": form.data["userId"],
            "channelId":channelId,
            "message":form.data["message"]}
        if form.data["imageUrl"]:
            new_message["imageUrl"] = form.data["imageUrl"]
        made_message = Message(**new_message)
        db.session.add(made_message)
        db.session.commit()
        return new_message
    return form.errors, 401







@message_routes.route('/<int:messageId>/edit')
def edit_message_by_id(messageId):
    message = Message.query.get(messageId)
    form = CreateMessageForm()
    if form.validate_on_submit:
        return "time to party"



@message_routes.route('/<int:messageId>/delete')
def delete_message_by_id(messageId):
    message = Message.query.get(messageId)
    db.session.delete(message)
    db.session.commit()
    return "Success!"
