"""add message column

Revision ID: 675d5258495a
Revises: f3b189beab7e
Create Date: 2024-05-20 12:59:23.179750

"""
from alembic import op
import sqlalchemy as sa

import os
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '675d5258495a'
down_revision = 'f3b189beab7e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('messages', schema=SCHEMA) as batch_op:
        batch_op.add_column(sa.Column('message', sa.String(length=4028), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('messages', schema=SCHEMA) as batch_op:
        batch_op.drop_column('message')

    # ### end Alembic commands ###
