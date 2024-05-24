from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ReactionForm(FlaskForm):
    emojiId = IntegerField('emojiId', validators=[DataRequired()])
    messageId= IntegerField('messageId', validators=[DataRequired()])
    userId =  IntegerField('userId', validators=[DataRequired()])
