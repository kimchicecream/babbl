from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
from sqlalchemy import func


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(func.lower(User.email) == func.lower(email)).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(func.lower(User.username) == func.lower(username)).first()
    if user:
        raise ValidationError('Username is already in use.')




# def testvalidation(form,field):
#     print("#######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
#     print(form, field)
#     if(True):
#         raise ValidationError("your couch is not very nice i shouldnt respect it ")




class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(min=5, max= 30)])
    email = StringField('email', validators=[DataRequired(), user_exists, Email('Please enter a valid Email, Brian. Nice try though')])
    password = StringField('password', validators=[DataRequired(), Length(min=8, max=30)])
    firstName =StringField('First Name', validators=[DataRequired(), Length(min=4, max=50)])
    lastName = StringField('Last Name', validators=[DataRequired(), Length(min=3, max=50)])
