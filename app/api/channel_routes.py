from flask import Blueprint, request
from app.models import Channel, db
from app.forms.channel_create import ChannelForm
from flask_login import current_user, login_user, logout_user, login_required

channel_routes = Blueprint('channels', __name__)

channel_routes.route('/', methods=['GET'])
def all_channel():
  channles = Channel.query.all()
  channle_list=[]
  for channel in channles:
    channle_list.append(channel.to_dict())
    return channle_list

@channel_routes.route('/create', methods=["GET","POST"])
def create_new_channel():
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_channel = {
            "name": form.data["name"],
            "serverId": form.data["serverId"],
            "creatorId": form.data["creatorId"],
        }

        madeChannel= Channel(**new_channel)
        db.session.add(madeChannel)
        db.session.commit()
        return madeChannel.to_dict()
    return form.errors

@channel_routes.route('/<int:channelId>/delete', methods=['GET'])
def delete_channel(channelId):
    channel_to_delete=Channel.query.get(channelId)
    db.session.delete(channel_to_delete)
    db.session.commit()
    return "success!"


@channel_routes.route('/<int:channelId>/edit', methods=["POST"])
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
        print(form.errors)
