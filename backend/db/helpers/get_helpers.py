from db.schemas import StudentSchema, CourseSchema, MagicSkillSchema, MagicSkillAssociationSchema
from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation
# ----------------------------------------------------------------------------------------------------------------
# Schemas

student_schema = StudentSchema()

course_schema = CourseSchema()

magic_skill_schema = MagicSkillSchema()

magic_skill_assoc_schema = MagicSkillAssociationSchema()

# ----------------------------------------------------------------------------------------------------------------
# Student


def get_all_students():
    students = Student.query.all()
    return student_schema.dump(students, many=True)


def get_students_by(*args, **kwargs):
    students = Student.query.filter_by(**kwargs).all()
    return student_schema.dump(students, many=True)


def get_student_by_id(student_id):
    student = Student.query.get(student_id)
    return student_schema.dump(student)


# ----------------------------------------------------------------------------------------------------------------
# MagicSkill

def get_all_magic_skills():
    magic_skills = MagicSkill.query.all()
    return magic_skill_schema.dump(magic_skills, many=True)


def get_magic_skill_by_id(skill_id):
    magic_skill = MagicSkill.query.get(skill_id)
    return magic_skill_schema.dump(magic_skill)


def get_magic_skills_by_title(skill_title):
    magic_skills = MagicSkill.query.filter_by(title=skill_title.capitalize()).all()
    return magic_skill_schema.dump(magic_skills, many=True)


# ----------------------------------------------------------------------------------------------------------------
# Course
def get_all_courses():
    courses = Course.query.all()
    return course_schema.dump(courses, many=True)


def get_course_by_id(course_id):
    course = Course.query.get(course_id)
    return course_schema.dump(course)


def get_course_by_title(course_title):
    course = Course.query.filter_by(title=course_title.capitalize()).one()
    return course_schema.dump(course)


# ----------------------------------------------------------------------------------------------------------------
# MagicSkillAssociation
