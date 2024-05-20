from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length


from app.models import Server

# def server_is_unique():




class CreateServerForm(FlaskForm):
    name=StringField('name', validators=[DataRequired(),  Length(max=40)])
    creatorId= IntegerField('creatorId', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired(), Length(max=2000)])
    imageUrl = StringField('imageUrl', validators=[Length(max=1023)])



