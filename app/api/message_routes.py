from flask import Blueprint, request
from app.models import User, db, Message, Reaction
#we need to create and import forms for each modal that uses one
#  EXAMPLE from app.forms.server_create mport CreateServerForm
from app.forms.message_create import CreateMessageForm
from flask_login import current_user, login_user, logout_user, login_required

from sqlalchemy.orm import joinedload

message_routes = Blueprint('messages',__name__)

#add login_required

@message_routes.route('/<int:channelsId>')
# @login_required
def get_all_messages_by_channel(channelsId):
    # messages = Message.query.filter_by(channelId=channelsId).all()
    # reaction_list=[]
    # for message in messages:
    #     reactions = Reaction.query.filter_by(messageId=message.id).all()
    #     reaction_list.append[reactions]

    # return [message.to_dict() for message in messages]
    messages = Message.query.options(joinedload(Message.reactions).joinedload(Reaction.userId)).filter_by(channelId=channelsId).all()


    result = []
    for message in messages:
        message_dict = message.to_dict()
        message_dict['reactions'] = [reaction.to_dict() for reaction in message.reactions]
        result.append(message_dict)
    return result


@message_routes.route('/<int:channelId>/new', methods=["POST", "GET"])
# @login_required
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
# @login_required
def edit_message_by_id(messageId):

    form = CreateMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        message_to_update = Message.query.get(messageId)
        message_to_update.message = form.data["message"]
        message_to_update.imageUrl = form.data["imageUrl"]
        message_to_update.isEdited = True
        db.session.commit()
        return message_to_update.to_dict()

    if form.errors:
        return form.errors, 401 #double check status number



@message_routes.route('/<int:messageId>/delete')
# @login_required
def delete_message_by_id(messageId):
    message_to_delete = Message.query.get(messageId)
    db.session.delete(message_to_delete)
    db.session.commit()
    return "Success!"
