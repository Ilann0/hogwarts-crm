from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation
from datetime import datetime


def change_student_first_name(student_id, new_name):
    Student.query.get(student_id).first_name = new_name
    db.session.commit()


def change_student_last_name(student_id, new_name):
    Student.query.get(student_id).last_name = new_name
    db.session.commit()


def change_student_last_update(student_id):
    Student.query.get(student_id).last_update = datetime.now()


def change_skill_level(student_id, skill_id, skill_level, skill_category):
    skill = MagicSkillAssociation.query.filter_by(student_id=student_id, skill_id=skill_id, skill_category=skill_category).one()
    skill.skill_level = skill_level
    db.session.commit()
