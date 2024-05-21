from flask import Blueprint, request
from app.models import db, Server
from app.forms.server_create import CreateServerForm
from flask_login import current_user, login_required

server_routes = Blueprint('servers', __name__)


@server_routes.route('/all')
def get_all_servers():
    servers = Server.query.all()
    answer_list = []
    for server in servers:
        answer_list.append(server.to_dict())
    return answer_list


@server_routes.route('/create', methods=["POST"])
@login_required
def create_new_server():
    # creator_id = current_user.get_id()
    # print(creator_id)
    form = CreateServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_server = {
            "name": form.data["name"],
            "description": form.data["description"],
            "imageUrl": form.data["imageUrl"],
            "creatorId": form.data["creatorId"]
        }

        madeServer= Server(
            **new_server
        )
        db.session.add(madeServer)
        db.session.commit()
        return madeServer.to_dict()
    return form.errors, 401

@server_routes.route('/<int:serverId>/delete', methods=['GET'])
@login_required
def delete_server(serverId):
    server_to_delete=Server.query.get(serverId)
    db.session.delete(server_to_delete)
    db.session.commit()
    return "success!"
    # return "cannot delete the server, please come back "
    # if it has errors, we will need to debug it

@server_routes.route('/<int:serverId>/edit', methods=["POST"])
@login_required
def update_server(serverId):
    form = CreateServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server_to_update=Server.query.get(serverId)
        server_to_update.name = form.data["name"]
        server_to_update.description = form.data["description"]
        server_to_update.imageUrl= form.data["imageUrl"]
        db.session.commit()
        return server_to_update.to_dict()

    if form.errors:
        print(form.errors)
