from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation
from db.helpers.error_helpers import catch_errors
from datetime import datetime


@catch_errors
def change_student_first_name(student_id, new_name):
    Student.query.filter_by(id=student_id).one().first_name = new_name
    change_student_last_update(student_id)
    db.session.commit()
    return {'message': f"Student's first name has successfully been changed to {new_name}"}


@catch_errors
def change_student_last_name(student_id, new_name):
    Student.query.filter_by(id=student_id).one().last_name = new_name
    change_student_last_update(student_id)
    db.session.commit()
    return {'message': f"Student's last name name has successfully been changed to {new_name}"}


def change_student_last_update(student_id):
    Student.query.get(student_id).last_update = datetime.now()


@catch_errors
def change_skill_level(student_id, skill_id, skill_level):
    association = MagicSkillAssociation.query.filter_by(student_id=student_id, skill_id=skill_id).one()
    association.skill_level = skill_level
    change_student_last_update(student_id)
    db.session.commit()
    return {'message': f"Skill has successfully been updated"}
