from datetime import datetime
import threading
import time

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


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/db.sqlite3'

db.db.init_app(app)
db.ma.init_app(app)

flask_cors.CORS(app)


# ----------------------------------------------------------------------------------------------------------------
# Students

@app.route('/student', methods=['POST', 'PUT'])
def student():
    data = request.get_json()

    if request.method == 'POST':
        return db.add_new_student_with_props(data)

    elif request.method == 'PUT':
        return db.update_student(data)


@app.route('/student/<int:id>', methods=['GET', 'DELETE'])
def student_id(id):
    if request.method == 'GET':
        return db.get_student_by_id(id)

    elif request.method == 'DELETE':
        return db.delete_student(id)


@app.route('/students/detailed')
def students_detailed():
    return db.get_all_students_detailed()


@app.route('/students')
def students():
    return jsonify(db.get_all_students())

# ----------------------------------------------------------------------------------------------------------------
# Courses


@app.route('/course', methods=['POST', 'PUT'])
def course():
    data = request.get_json()

    if request.method == 'POST':
        return db.add_new_course(data)

    elif request.method == 'PUT':
        return db.update_course(data)


@app.route('/course/<int:id>', methods=['GET', 'DELETE'])
def course_id(id):
    if request.method == 'GET':
        return db.get_course_by_id(id)

    elif request.method == 'DELETE':
        return db.delete_course(id)


@app.route('/courses', methods=['GET'])
def courses():
    return jsonify(db.get_all_courses())

# ----------------------------------------------------------------------------------------------------------------
# Magic Skills


@app.route('/magicskill', methods=['POST', 'PUT'])
def add_magic_skill():
    data = request.get_json()

    if request.method == 'POST':
        return db.add_new_magic_skill(data)

    elif request.method == 'PUT':
        return db.update_magic_skill(data)


@app.route('/magicskill/<int:id>', methods=['GET', 'DELETE'])
def magic_skill_id(id):
    if request.method == 'GET':
        return db.get_magic_skill_by_id(id)

    elif request.method == 'DELETE':
        return db.delete_magic_skill(id)


@app.route('/magicskills', methods=['GET'])
def magic_skills():
    return jsonify(db.get_all_magic_skills())


# ----------------------------------------------------------------------------------------------------------------
# Statistics


@app.route('/stats/students')
def students_stats():
    return jsonify(db.get_students_added_per_month())


@app.route('/stats/courses')
def courses_stats():
    return jsonify(db.get_course_student_counts())


@app.route('/stats/magicskills')
def magic_skills_stats():
    return jsonify(db.get_magic_skill_student_counts())


def run_app():
    app.run(debug=DEBUG, use_reloader=True, port=PORT, host=HOST)


if __name__ == "__main__":
    try:
        with open('db/db.sqlite3') as f:
            print('DB Exists')
    except IOError:
        db.init_database()
        print('Created DB')

# comment out on deploy
    run_app()
