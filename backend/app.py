from datetime import datetime
import threading

import flask
from flask import jsonify
import flask_sqlalchemy
import flask_marshmallow

import db

PORT = 3000
HOST = 'localhost'
DEBUG = True

app = flask.Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/db.sqlite3'

database = flask_sqlalchemy.SQLAlchemy(app=app)
marshmallow = flask_marshmallow.Marshmallow(app=app)

@app.route('/student/<int:id>')
def student(id):
    return jsonify(db.get_student_by_id(id))

@app.route('/students/detailed')
def students_detailed():
    return jsonify(db.get_all_students())

@app.route('/students')
def students():
    students = db.get_all_students()
    for student in students:
        del student['magic_skills']
        del student['courses_of_interest']

    return jsonify(students)

@app.route('/add_student')
def add_student():
    return jsonify(db.get_student_aquired_skills(1))

def run_app():
    app.run(debug=DEBUG, use_reloader=True, port=PORT, host=HOST)


if __name__ == "__main__":
    try:
        with open('db/db.sqlite3') as f:
            print('DB Exists')
    except IOError:
        db.init_database()
        db.add_new_student('ilann', 'ohayon')
        db.add_new_student('sponge', 'bob')
        db.add_new_course('alchemy')
        db.add_new_magic_skill('omnipotence')
        db.add_new_magic_skill('alchemy')
        db.add_new_magic_skill('omnipresence')
        db.add_course_to_student(1, 1)
        db.add_skill_to_student(1, 1, 3, 'aquired')
        db.add_skill_to_student(2, 1, 3, 'aquired')
        db.add_skill_to_student(1, 2, 3, 'aquired')
        db.add_skill_to_student(1, 3, 2, 'desired')

    db.change_skill_level(1, 3, 22)
    run_app()
