from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation
from db.helpers.error_helpers import catch_errors
from db.helpers.delete_helpers import delete_course_from_student, delete_skill_from_student
from db.helpers.add_helpers import add_course_to_student, add_skill_to_student
from datetime import datetime


@catch_errors
def update_student(data):
    student = Student.query.filter_by(id=data['id']).one()

    update_personal_info(student, data['first_name'], data['last_name'])
    dispatch_magic_skills(student, data['magic_skills'])
    dispatch_courses(student, data['courses_of_interest'])

    student.last_update = datetime.now()
    db.session.commit()

    return {"message": f"Student '{student.first_name}' has successfully been updated."}, 200


def dispatch_magic_skills(student, magic_skills):
    for magic_skill in magic_skills:
        if magic_skill['meta']:
            if magic_skill['meta']['isDeleted']:
                delete_skill_from_student(student.id, magic_skill['id'])
            elif magic_skill['meta']['isNew']:
                add_skill_to_student(student, magic_skill['id'], magic_skill['skill_level'], magic_skill['skill_category'])
            elif magic_skill['meta']['isModified']:
                update_student_skill(student.id, magic_skill['id'], magic_skill['skill_level'], magic_skill['skill_category'])


def dispatch_courses(student, courses):
    for course in courses:
        if course['meta']['isDeleted']:
            delete_course_from_student(student.id, course['id'])
        elif course['meta']['isNew']:
            add_course_to_student(student, course['id'])


def update_personal_info(student, first_name, last_name):
    student.first_name = first_name
    student.last_name = last_name


def update_student_skill(student_id, skill_id, skill_level, skill_category):
    association = MagicSkillAssociation.query.filter_by(student_id=student_id, skill_id=skill_id, skill_category=skill_category).one()
    association.skill_level = skill_level
    association.skill_category = skill_category

# ----------------------------------------------------------------------------------------------------------------
# Course


def update_course(data):
    course = Course.query.filter_by(id=data['id']).one()
    course.title = data['title']
    db.session.commit()

    return {"message": f"Course '{course.title}' has successfully been updated"}, 200

# ----------------------------------------------------------------------------------------------------------------
# MagicSkill


def update_magic_skill(data):
    skill = MagicSkill.query.filter_by(id=data['id']).one()
    skill.title = data['title']
    db.session.commit()

    return {"message": f"Magic skill '{skill.title}' has successfully been updated"}, 200
