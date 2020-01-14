from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation
# ----------------------------------------------------------------------------------------------------------------
# Tables


def delete_student(student_id):
    student = Student.query.get(student_id)
    db.session.delete(student)
    db.session.commit()


def delete_magic_skill(skill_id):
    magic_skill = MagicSkill.get(skill_id)
    db.session.delete(magic_skill)
    db.session.commit()


def delete_course(course_id):
    course = Course.query.get(course_id)
    db.session.delete(course)
    db.session.commit()

# ----------------------------------------------------------------------------------------------------------------
# Associations


def delete_course_from_student(student_id, course_id):
    course = Course.query.get(course_id)
    student = Student.query.get(student_id)
    student.courses_of_interest.delete(course)
    db.session.commit()


def delete_skill_from_student(student_id, skill_id, skill_category):
    MagicSkillAssociation.query.filter_by(student_id=student_id, skill_id=skill_id, skill_category=skill_category).delete()
    db.session.commit()
