from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length


from app.models import Message



class CreateMessageForm(FlaskForm):
    message=StringField('name', validators=[DataRequired(),  Length(max=4028)])
    userId= IntegerField('creatorId', validators=[DataRequired()])
    channelId = IntegerField('channelId', validators=[DataRequired()])
    imageUrl = StringField('imageUrl', validators=[Length(max=1023)])
