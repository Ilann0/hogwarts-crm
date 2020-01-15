from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation, CourseAssociation
from db.helpers.change_helpers import change_student_last_update
from db.helpers.error_helpers import catch_errors
# ----------------------------------------------------------------------------------------------------------------
# Tables


@catch_errors
def delete_student(student_id):
    student = Student.query.filter_by(id=student_id).one()
    db.session.delete(student)
    db.session.commit()
    return {'message': f"Student '{student.first_name}' has successfully been deleted."}


@catch_errors
def delete_magic_skill(skill_id):
    magic_skill = MagicSkill.filter_by(id=skill_id).one()
    db.session.delete(magic_skill)
    db.session.commit()
    return {'message': f"Skill '{magic_skill.titles}' has successfully been deleted."}


@catch_errors
def delete_course(course_id):
    course = Course.query.filter_by(id=course_id).one()
    db.session.delete(course)
    db.session.commit()
    return {'message': f"Course '{course.titles}' has successfully been deleted."}

# ----------------------------------------------------------------------------------------------------------------
# Associations


@catch_errors
def delete_course_from_student(student_id, course_id):
    CourseAssociation.query.filter_by(student_id=student_id, course_id=course_id).one().delete()
    change_student_last_update(student_id)
    db.session.commit()
    return {'message': f"Course with ID: '{course_id}' has successfully been deleted from sutdent with ID: '{student_id}'."}


@catch_errors
def delete_skill_from_student(student_id, skill_id):
    MagicSkillAssociation.query.filter_by(student_id=student_id, skill_id=skill_id).delete()
    change_student_last_update(student_id)
    db.session.commit()
    return {'message': f"Skill with ID: '{skill_id}' has successfully been deleted from sutdent with ID: '{student_id}'"}
