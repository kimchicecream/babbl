from flask import Blueprint, request
from app.models import Channel, db, Server, channel_membership
from app.forms.channel_create import ChannelForm
from flask_login import current_user, login_required
from sqlalchemy import insert, delete

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/<int:serversId>/all')
def all_channel(serversId):
  channels = Channel.query.filter_by(serverId=serversId).all()
  print(channels)
  channel_list=[]
  for channel in channels:
    channel_list.append(channel.to_dict())
  return channel_list

@channel_routes.route('/new', methods=["GET","POST"])
@login_required
def create_new_channel():
    print("CREATE CHANNEL CALL ??????????????????????????????????????????????????????????????????")
    # auth REQUIRED, CURRENT USER  SERVER OWNER
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)

    server = Server.query.get(form.data["serverId"])
    if server.creatorId != current_user.id:
        print('fail !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        return {'errors': {'message': 'Unauthorized'}}, 401


    if form.validate_on_submit():
        new_channel = {
            "name": form.data["name"],
            "serverId": form.data["serverId"], #how to get the server id?
            "creatorId": form.data["creatorId"]
        }

        madeChannel= Channel(**new_channel)
        db.session.add(madeChannel)
        db.session.commit()
        return madeChannel.to_dict()
    return form.errors, 401

@channel_routes.route('/<int:channelId>/delete', methods=['GET'])
@login_required
def delete_channel(channelId):
        # auth REQUIRED, CURRENT USER  SERVER OWNER
    form = ChannelForm()
    print(form.data,"THIS IS FROM THE DELETE CHANNEL ROUTE IN THE BE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    server = Server.query.get(form.data["serverId"])
    # if server.creatorId != current_user.id:
    #     return {'errors': {'message': 'Unauthorized'}}, 401

    channel_to_delete=Channel.query.get(channelId)
    db.session.delete(channel_to_delete)
    db.session.commit()
    return "success!"


@channel_routes.route('/<int:channelId>/edit', methods=["POST"])
@login_required
def update_channel(channelId):
        # auth REQUIRED, CURRENT USER  SERVER OWNER

    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)

    # server = Server.query.get(form.data["serverId"])
    # if server.creatorId != current_user.id:
    #     return {'errors': {'message': 'Unauthorized'}}, 401
    if form.validate_on_submit():
        channel_to_update=Channel.query.get(channelId)
        channel_to_update.name = form.data["name"]
        channel_to_update.serverId = form.data["serverId"]
        channel_to_update.creatorId= form.data["creatorId"]
        db.session.add(channel_to_update)
        db.session.commit()
        return channel_to_update.to_dict()

    if form.errors:
        return form.errors, 401 #double check status number

@channel_routes.route('/<int:channelId>/join')
@login_required
def join_channel(channelId):
    join_channel_statement= insert(channel_membership).values(user_id=current_user.id, channel_id= channelId)
    db.session.execute(join_channel_statement)
    db.session.commit()
    return "success"

@channel_routes.route('/<int:channelId>/leave')
@login_required
def leave_channel(channelId):
    leave_channel_statement = delete(channel_membership).where(channel_membership.c.user_id==current_user.id, channel_membership.c.channel_id ==channelId)
    db.session.execute(leave_channel_statement)
    db.session.commit()
    return"success"

@channel_routes.route('/<int:channelId>/allMembers')
# @login_required
def all_channel_members(channelId):
   channel= Channel.query.get(channelId)
   users = channel.users
   answerArray = [user.to_dict() for user in users]
   answerDict = {}
   for answer in answerArray:
       answerDict[answer["id"]]=answer


   return answerDict
