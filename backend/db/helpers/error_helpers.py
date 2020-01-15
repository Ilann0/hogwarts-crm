import sqlalchemy
from app import database as db


def catch_errors(func):
    def wrapped_func(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except sqlalchemy.orm.exc.NoResultFound:
            db.session.rollback()
            return {'message': 'One or more of the filtering parameters provided do not exist'}
        except:
            return {'message': 'Unknown error, please call an adult to handle the situation'}
    return wrapped_func
