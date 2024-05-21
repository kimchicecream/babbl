from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def user_exists(form, field):
    # print(User.query.all(), '!!!!!!!!!!!!!!!!!!!!')
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    # print(f'!!!!!LOGIN FORM: checking if user exists with email: {email}')
    # print(f'!!!!!LOGIN FORM: user query result: {user}')
    if not user:
        # print('!!!!!LOGIN FORM: User not found')
        raise ValidationError('User not found.')
    print("Made it through with no errors")


def password_matches(form, field):
    # print(User.query.all(), '!!!!!!!!!!!!!!!!!!!!')
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    # print(f'!!!!!LOGIN FORM: checking password for user with email: {email}')
    # print(f'!!!!!LOGIN FORM: User query result: {user}')
    if not user:
        # print('!!!!!LOGIN FORM: No such user exists.')
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        # print('!!!!!LOGIN FORM: Password was incorrect.')
        raise ValidationError('Password was incorrect.')
    print("Made it through with no errors")


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
