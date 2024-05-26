from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Channel, Server

#can only create a channel in a server that you own
def validate_server_ownership(form, field):
#if I don't own a server, raise an error
    server = Server.query.get(form.data["serverId"])
    if server.creatorId != form.data["creatorId"]:
        print('validate server ownership failed')
        raise ValidationError('you cannot create a channel in a server you do not own')

#unique channel name in a server
def no_double_channels(form, field):
    channels = Channel.query.filter(Channel.serverId == form.data["serverId"]).all()
    for channel in channels:
        if field.data == channel.name:
            print('no double channels failed')
            raise ValidationError('This channel name has already existed! choose another one!')


class ChannelForm(FlaskForm):
    name=StringField('name', validators=[DataRequired(),  Length(max=40), no_double_channels])
    serverId= IntegerField('serverId', validators=[DataRequired(), validate_server_ownership])
    creatorId = StringField('creatorId', validators=[DataRequired()])
    submit= SubmitField("Submit")
