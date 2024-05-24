from flask import Blueprint, request
from app.models import db, Server, server_membership
from app.forms.server_create import CreateServerForm
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from sqlalchemy import insert

server_routes = Blueprint('servers', __name__)

@server_routes.route('/all')
def get_all_servers():
    print("BELOW THIS IS GOING TO PRINT USERSSss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    print(current_user.id)
    print("ABOVE THIS IS GOING TO PRINT USERSSss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")


    servers = Server.query.all()
    answer_list = []
    for server in servers:
        answer_list.append(server.to_dict())
    return answer_list


@server_routes.route('/<int:userId>')
@login_required
def get_servers_by_userId(userId):
    servers = Server.query.options(joinedload(Server.users)).all()
    answer_list = []
    for server in servers:
        answer_list.append(server.to_dict())
    return answer_list


# @server_routes.route('/<int:serverId>/join', methods=["POST"])
# # @login_required
# def join_server(serverId):

#     server = Server.query.get(serverId)
#     users =  server.users
#     res = insert(server_membership).values(user_id=current_user.id, server_id=serverId)
#     print("BELOW THIS IS GOING TO PRINT USERSSss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
#     print(res)



#     return





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
# @login_required
def delete_server(serverId):
     # auth REQUIRED, CURRENT USER HAS TO OWN SERVER
    server_to_delete=Server.query.get(serverId)
    db.session.delete(server_to_delete)
    db.session.commit()
    return "success!"
    # return "cannot delete the server, please come back "
    # if it has errors, we will need to debug it

@server_routes.route('/<int:serverId>/edit', methods=["POST"])
# @login_required
def update_server(serverId):
     # auth REQUIRED, CURRENT USER OWN THE SERVER
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
        return form.errors, 401 #double check status number
