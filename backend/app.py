from datetime import datetime
import threading

import flask
from flask import jsonify
import flask_sqlalchemy
import flask_marshmallow
from marshmallow import pprint

import db

PORT = 3000
HOST = 'localhost'
DEBUG = True

app = flask.Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/db.sqlite3'

database = flask_sqlalchemy.SQLAlchemy(app=app)
marshmallow = flask_marshmallow.Marshmallow(app=app)


@app.route('/get/student/<int:id>')
def student(id):
    return jsonify(db.get_student_by_id(id))


@app.route('/get/students/detailed')
def students_detailed():
    return jsonify(db.get_all_students())


@app.route('/get/students')
def students():
    students = db.get_all_students()
    for student in students:
        del student['magic_skills']
        del student['courses_of_interest']

    return jsonify(students)


@app.route('/add/student', methods=['POST'])
def add_student():
    return 'add_student'


@app.route('/student/<int:sid>/<int:cid>')
def h(sid, cid):
    return jsonify(db.add_course_to_student(sid, cid))


@app.route('/delete/student', methods=['POST', 'DELETE'])
def delete_student():
    return 'delete_student'


@app.route('/update/student', methods=['POST', 'PUT'])
def update_student():
    return 'update_student'


def run_app():
    app.run(debug=DEBUG, use_reloader=True, port=PORT, host=HOST)


if __name__ == "__main__":
    try:
        with open('db/db.sqlite3') as f:
            print('DB Exists')
    except IOError:
        db.init_database()

    # print(db.Student.query.filter_by(id=4).one())
    # print(db.change_skill_level(1, 1, 1))
    pprint(db.get_all_students())

    run_app()
