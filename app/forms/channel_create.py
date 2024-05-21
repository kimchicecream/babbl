from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length


class ChannelForm(FlaskForm):
    name=StringField('name', validators=[DataRequired(),  Length(max=40)])
    serverId= IntegerField('serverId', validators=[DataRequired()])
    creatorId = StringField('creatorId', validators=[DataRequired()])
    submit= SubmitField("Submit")
