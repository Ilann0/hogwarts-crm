import sqlalchemy
from app import database as db


def catch_errors(func):
    def wrapped_func(*args, **kwargs):
        try:
            return func(*args, **kwargs)

        except sqlalchemy.orm.exc.NoResultFound:
            db.session.rollback()
            return {'message': 'One or more of the requested items do not exist'}, 404

        except sqlalchemy.exc.IntegrityError:
            db.session.rollback()
            return {'message': 'Item already exists'}, 401

        except KeyError:
            db.session.rollback()
            return {'message': 'One or more parameters are missing or incorect'}, 400

        except Exception as error:
            return {'message': 'Unknown error, please call an adult to handle the situation'}, 400

    return wrapped_func
