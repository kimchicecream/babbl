from flask import Blueprint, request
from app.models import db, Reaction
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from sqlalchemy import insert, delete

reaction_routes = Blueprint('reactions', __name__)

@reaction_routes.route('/<int:reactionId>/delete')
@login_required
def delete_reaction(reactionId):
     # auth REQUIRED, CURRENT USER
    reaction_to_delete = Reaction.query.get(reactionId)
    if reaction_to_delete.userId != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401
    returnObj = reaction_to_delete.for_message()
    db.session.delete(reaction_to_delete)
    db.session.commit()
    return returnObj
