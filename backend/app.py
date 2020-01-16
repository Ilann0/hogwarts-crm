from datetime import datetime
import threading

from flask import request, jsonify
import flask_marshmallow
import flask_sqlalchemy
import flask_cors
import flask

import db

PORT = 5000
HOST = 'localhost'
DEBUG = True

app = flask.Flask(__name__)
flask_cors.CORS(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/db.sqlite3'

database = flask_sqlalchemy.SQLAlchemy(app=app)
marshmallow = flask_marshmallow.Marshmallow(app=app)


# ----------------------------------------------------------------------------------------------------------------
# Students

# TODO
@app.route('/student', methods=['POST', 'DELETE', 'PUT'])
def student():
    data = request.get_json()

    if request.method == 'POST':
        return db.add_new_student_with_props(data)

    elif request.method == 'DELETE':
        return db.delete_student(data)

    elif request.method == 'PUT':
        return 'Not yet implemented..'

# DONE
@app.route('/student/<int:id>')
def student_id(id):
    return db.get_student_by_id(id)

# DONE
@app.route('/students/detailed')
def students_detailed():
    return db.get_all_students_detailed()

# DONE
@app.route('/students')
def students():
    return jsonify(db.get_all_students())

# ----------------------------------------------------------------------------------------------------------------
# Courses


# TODO
@app.route('/course', methods=['POST', 'DELETE', 'PUT'])
def course():
    data = request.get_json()

    if request.method == 'POST':
        return db.add_new_course(data)

    elif request.method == 'DELETE':
        return db.delete_course(data)

    elif request.method == 'PUT':
        return 'Not yet implemented..'

# DONE
@app.route('/course/<int:id>', methods=['GET'])
def course_id(id):
    return db.get_course_by_id(id)

# DONE
@app.route('/courses', methods=['GET'])
def courses():
    return jsonify(db.get_all_courses())

# ----------------------------------------------------------------------------------------------------------------
# Magic Skills


# TODO
@app.route('/magic_skill', methods=['POST', 'DELETE', 'PUT'])
def add_magic_skill():
    data = request.get_json()

    if request.method == 'POST':
        return db.add_new_magic_skill(data)

    elif request.method == 'DELETE':
        return db.delete_magic_skill(data)

    elif request.method == 'PUT':
        return 'Not yet implemented..'

# DONE
@app.route('/magic_skill/<int:id>', methods=['GET'])
def magic_skill_id(id):
    return db.get_magic_skill_by_id(id)

# DONE
@app.route('/magicskills', methods=['GET'])
def magic_skills():
    return jsonify(db.get_all_magic_skills())


def run_app():
    app.run(debug=DEBUG, use_reloader=True, port=PORT, host=HOST)


if __name__ == "__main__":
    try:
        with open('db/db.sqlite3') as f:
            print('DB Exists')
    except IOError:
        db.init_database()
        print('Created DB')

    run_app()
