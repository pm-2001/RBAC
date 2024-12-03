"""create user

Revision ID: d30cc2d3d422
Revises: ce83cba0ba40
Create Date: 2024-12-04 03:21:47.478338

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd30cc2d3d422'
down_revision: Union[str, None] = 'ce83cba0ba40'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
