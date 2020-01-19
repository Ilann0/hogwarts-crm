from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation, CourseAssociation
# from db.helpers.change_helpers import change_student_last_update
from db.helpers.error_helpers import catch_errors
# ----------------------------------------------------------------------------------------------------------------
# Tables


@catch_errors
def delete_student(id):
    student = Student.query.filter_by(id=id).one()
    db.session.delete(student)
    db.session.commit()
    return {'message': f"Student '{student.first_name}' has successfully been deleted."}


@catch_errors
def delete_magic_skill(id):
    magic_skill = MagicSkill.query.filter_by(id=id).one()
    db.session.delete(magic_skill)
    db.session.commit()
    return {'message': f"Skill '{magic_skill.title}' has successfully been deleted."}


@catch_errors
def delete_course(id):
    course = Course.query.filter_by(id=id).one()
    db.session.delete(course)
    db.session.commit()
    return {'message': f"Course {course.title} has successfully been deleted."}

# ----------------------------------------------------------------------------------------------------------------
# Associations


@catch_errors
def delete_course_from_student(student_id, course_id):
    CourseAssociation.query.filter_by(student_id=student_id, course_id=course_id).one().delete()

    return {'message': f"Course with ID: '{course_id}' has successfully been deleted from sutdent with ID: '{student_id}'."}


@catch_errors
def delete_skill_from_student(student_id, skill_id):
    MagicSkillAssociation.query.filter_by(student_id=student_id, skill_id=skill_id).delete()

    return {'message': f"Skill with ID: '{skill_id}' has successfully been deleted from sutdent with ID: '{student_id}'"}
