from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation, CourseAssociation
from db.helpers.change_helpers import change_student_last_update
from db.helpers.error_helpers import catch_errors
# ----------------------------------------------------------------------------------------------------------------
# Tables
@catch_errors
def add_new_student_with_props(data):
    student = add_new_student(first_name=data['first_name'], last_name=data['last_name'])
    for course_id in data['courses']:
        add_course_to_student(student.id, course_id)
    for magic_skill in data['skills']:
        add_skill_to_student(student.id, magic_skill['id'], magic_skill['level'], magic_skill['category'])
    db.session.commit()

    return f"Student '{student.first_name}' has successfully been created"


def add_new_student(first_name, last_name):
    student = Student(first_name=first_name.capitalize(), last_name=last_name.capitalize())
    db.session.add(student)
    db.session.commit()
    return student


@catch_errors
def add_new_course(data):
    course = Course(title=data['course_title'].capitalize())
    db.session.add(course)
    db.session.commit()
    return {'message': f"Course '{course.title}' has successfully been created"}


@catch_errors
def add_new_magic_skill(data):
    magic_skill = MagicSkill(title=data['skill_title'].capitalize())
    db.session.add(magic_skill)
    db.session.commit()
    return {'message': f"Magic skill '{magic_skill.title}' has successfully been created"}


# ----------------------------------------------------------------------------------------------------------------
# Associations

def add_skill_to_student(student_id, skill_id, skill_level, skill_category):
    student = Student.query.filter_by(id=student_id).one()
    association = MagicSkillAssociation(skill_level=skill_level, skill_category=skill_category)
    association.magic_skill = MagicSkill.query.filter_by(id=skill_id).one()
    student.magic_skills.append(association)


def add_course_to_student(student_id, course_id):
    student = Student.query.filter_by(id=student_id).one()
    association = CourseAssociation()
    association.course = Course.query.filter_by(id=course_id).one()
    student.courses_of_interest.append(association)
