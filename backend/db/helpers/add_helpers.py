from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation, CourseAssociation
from db.helpers.change_helpers import change_student_last_update
from db.helpers.error_helpers import catch_errors
# ----------------------------------------------------------------------------------------------------------------
# Tables


@catch_errors
def add_new_student(first_name, last_name):
    student = Student(first_name=first_name.capitalize(), last_name=last_name.capitalize())
    db.session.add(student)
    db.session.commit()
    return f"Student '{student.first_name}' has successfully been created"


@catch_errors
def add_new_course(course_title):
    course = Course(title=course_title.capitalize())
    db.session.add(course)
    db.session.commit()
    return {'message': f"Course '{course.title}' has successfully been created"}


@catch_errors
def add_new_magic_skill(skill_title):
    skill = MagicSkill(title=skill_title.capitalize())
    db.session.add(skill)
    db.session.commit()
    return {'message': f"Magic skill '{magic_skill.title}' has successfully been created"}


# ----------------------------------------------------------------------------------------------------------------
# Associations

@catch_errors
def add_skill_to_student(student_id, skill_id, skill_level, skill_category):
    student = Student.query.get(student_id)
    association = MagicSkillAssociation(skill_level=skill_level, skill_category=skill_category)
    association.magic_skill = MagicSkill.query.get(skill_id)
    student.magic_skills.append(association)
    change_student_last_update(student_id)
    db.session.commit()
    return {'message': f"Skill '{association.magic_skill.title}' has successfully been added to '{student.first_name}'"}


@catch_errors
def add_course_to_student(student_id, course_id):
    student = Student.query.filter_by(id=student_id).one()
    association = CourseAssociation()
    association.course = Course.query.filter_by(id=course_id).one()
    student.courses_of_interest.append(association)
    change_student_last_update(student_id)
    db.session.commit()
    return {'message': f"Course '{association.course.title}' has successfully been added to '{student.first_name}'"}
