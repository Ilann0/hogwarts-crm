from datetime import datetime

import flask_sqlalchemy

from app import database as db

class MagicSkillAssociation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id', ondelete='CASCADE'), unique=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('magic_skill.id', ondelete='CASCADE'), unique=False)
    skill_category = db.Column(db.String(7), nullable=False, default='desired')
    skill_level = db.Column(db.Integer, default=1)

    student = db.relationship('Student', backref=db.backref('magic_skills', cascade='all, delete-orphan'))
    magic_skill = db.relationship('MagicSkill', foreign_keys=[skill_id])


class CourseAssociation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id', ondelete='CASCADE'), unique=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id', ondelete='CASCADE'), unique=False)

    student = db.relationship('Student', backref=db.backref('courses_of_interest', cascade='all, delete-orphan'))
    course = db.relationship('Course', foreign_keys=[course_id])


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.now)
    last_update = db.Column(db.DateTime, default=datetime.now)
    # Relations:
    # MagicSkillAssociation --> magic_skills
    # CourseAssociation --> courses_of_interest


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String(50), unique=True, nullable=False)
    # Relations:
    # Student --> interested_students


class MagicSkill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), unique=True, nullable=False)
    # Relations:
    # MagicSkillAssociation --> students


def init_database():
    db.create_all()
