from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation, CourseAssociation
from db.helpers.error_helpers import catch_errors
import datetime
from random import randint
# ----------------------------------------------------------------------------------------------------------------
# Tables
# @catch_errors


@catch_errors
def add_new_student_with_props(data):
    student = add_new_student(first_name=data['first_name'], last_name=data['last_name'])

    for course in data['courses_of_interest']:
        add_course_to_student(student, course['id'])
    for magic_skill in data['magic_skills']:
        add_skill_to_student(student, magic_skill['id'], magic_skill['skill_level'], magic_skill['skill_category'])

    student.date_created = datetime.datetime(2020, randint(1, 12), randint(1, 28))
    db.session.commit()

    return {'message': f"Student '{student.first_name}' has successfully been created"}, 201


def add_new_student(first_name, last_name):
    student = Student(first_name=first_name.capitalize(), last_name=last_name.capitalize())
    db.session.add(student)

    return student


@catch_errors
def add_new_course(data):
    course = Course(title=data['title'].capitalize())
    db.session.add(course)
    db.session.commit()

    return {'message': f"Course '{course.title}' has successfully been created"}, 201


@catch_errors
def add_new_magic_skill(data):
    magic_skill = MagicSkill(title=data['title'].capitalize())
    db.session.add(magic_skill)
    db.session.commit()

    return {'message': f"Magic skill '{magic_skill.title}' has successfully been created"}, 201


# ----------------------------------------------------------------------------------------------------------------
# Associations

def add_skill_to_student(student, skill_id, skill_level, skill_category):
    association = MagicSkillAssociation(skill_level=skill_level, skill_category=skill_category)
    association.magic_skill = MagicSkill.query.filter_by(id=skill_id).one()
    student.magic_skills.append(association)


def add_course_to_student(student, course_id):
    association = CourseAssociation()
    association.course = Course.query.filter_by(id=course_id).one()
    student.courses_of_interest.append(association)
