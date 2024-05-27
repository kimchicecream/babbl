from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Server
from sqlalchemy import func


#unique
def server_is_unique(form, field):
    name = field.data
    server = Server.query.filter(func.lower(Server.name)== func.lower(name)).first()
    if server:
        raise ValidationError("Server name is already in use")


class CreateServerForm(FlaskForm):
    name=StringField('name', validators=[DataRequired(),  Length(max=40), server_is_unique])
    description = StringField('description', validators=[DataRequired(), Length(max=2000)])
    imageUrl = StringField('imageUrl', validators=[Length(max=1023)])
    creatorId= IntegerField('creatorId', validators=[DataRequired()])
    submit= SubmitField("Submit")
