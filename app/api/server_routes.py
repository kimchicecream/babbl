from flask import Blueprint, request
from app.models import User, db, Server
#we need to create and import forms for each modal that uses one
from app.forms.server_create import CreateServerForm
from flask_login import current_user, login_user, logout_user, login_required

server_routes = Blueprint('servers', __name__)

@server_routes.route('/all')
def get_all_servers():
    servers = Server.query.all()
    answer_list = []
    for server in servers:
        answer_list.append(server.to_dict())
    return answer_list


@server_routes.route('/create', methods=["POST"])
def create_new_server():
