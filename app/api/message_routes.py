from flask import Blueprint, request
from app.models import User, db, Message, Reaction
#we need to create and import forms for each modal that uses one
#  EXAMPLE from app.forms.server_create mport CreateServerForm
from app.forms.message_create import CreateMessageForm
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.reaction import ReactionForm

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
    messages = Message.query.options(joinedload(Message.reactions), joinedload(Message.user)).filter_by(channelId=channelsId).all()

    result = []
    for message in messages:

        message_dict = message.to_dict()
        message_dict['user'] = message.user.for_messages()
        # print(message_dict)

        reactions_list = [reaction.for_message() for reaction in message.reactions]
        reactions_dict= {}
        for reaction in reactions_list:

            reactions_dict[reaction['id']]=reaction


        message_dict['reactions'] =reactions_dict
        result.append(message_dict)
    return result

@message_routes.route('/<int:reactionId>/delete')
# @login_required
def delete_reaction(reactionId):
    reaction_to_delete = Reaction.query.get(reactionId)
    returnObj = reaction_to_delete.for_message()
    db.session.delete(reaction_to_delete)
    db.session.commit()
    return returnObj



@message_routes.route('/<int:messageId>/reactions', methods = ["POST"])
# @login_required
def create_reaction(messageId):
    form = ReactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        newReaction = {
            "userId": form.data["userId"],
            "messageId": messageId,
            "emojiId": form.data["emojiId"]
        }
        made_reaction = Reaction ( **newReaction)
        db.session.add(made_reaction)
        db.session.commit()
        return made_reaction.for_message()
    else:
        return form.errors, 401






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
        return made_message
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
