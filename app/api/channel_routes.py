from flask import Blueprint, request
from app.models import Channel, db, Server
from app.forms.channel_create import ChannelForm
from flask_login import current_user, login_required

channel_routes = Blueprint('channels', __name__)

#add login_required

@channel_routes.route('/<int:serversId>/all')
# @login_required
def all_channel(serversId):
  channels = Channel.query.filter_by(serverId=serversId).all()
  print(channels)
  channel_list=[]
  for channel in channels:
    channel_list.append(channel.to_dict())
  return channel_list

@channel_routes.route('/new', methods=["GET","POST"])
# @login_required
def create_new_channel():

    # creator_id = current_user.get_id()
    # print(creator_id)v``
    # print(server_id)
    # curr_user_servers = Server.query.filter_by(creatorId=creator_id)

    # if not curr_user_servers:
    #     return {"error": "No server found for this user."}, 400

    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
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
# @login_required
def delete_channel(channelId):
    channel_to_delete=Channel.query.get(channelId)
    db.session.delete(channel_to_delete)
    db.session.commit()
    return "success!"


@channel_routes.route('/<int:channelId>/edit', methods=["POST"])
# @login_required
def update_channel(channelId):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel_to_update=Channel.query.get(channelId)
        channel_to_update.name = form.data["name"]
        channel_to_update.serverId = form.data["serverId"]
        channel_to_update.creatorId= form.data["creatorId"]
        db.session.commit()
        return channel_to_update.to_dict()

    if form.errors:
        return form.errors, 401 #double check status number
