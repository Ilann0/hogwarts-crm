from sqlalchemy import funcfilter, func
from db.schemas import StudentSchema, CourseSchema, MagicSkillSchema, MagicSkillAssociationSchema
from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation, CourseAssociation
from db.helpers.error_helpers import catch_errors
# ----------------------------------------------------------------------------------------------------------------
# Schemas

simple_student_schema = StudentSchema(only=('id', 'first_name', 'last_name', 'date_created', 'last_update'))

student_schema = StudentSchema()

course_schema = CourseSchema(only=('id', 'title'))

magic_skill_schema = MagicSkillSchema(only=('id', 'title'))

magic_skill_assoc_schema = MagicSkillAssociationSchema()

# ----------------------------------------------------------------------------------------------------------------
# Student


@catch_errors
def get_all_students():
    students = Student.query.all()

    return simple_student_schema.dump(students, many=True)


@catch_errors
def get_all_students_detailed():
    students = Student.query.all()

    return student_schema.dump(students, many=True)


@catch_errors
def get_students_by(*args, **kwargs):
    students = Student.query.filter_by(**kwargs).all()

    return student_schema.dump(students, many=True), 200


@catch_errors
def get_student_by_id(student_id):
    student = Student.query.filter_by(id=student_id).one()
    print('>>', len(student_schema.dump(student)['magic_skills']))
    return student_schema.dump(student), 200


# ----------------------------------------------------------------------------------------------------------------
# MagicSkill

@catch_errors
def get_all_magic_skills():
    magic_skills = MagicSkill.query.all()

    return magic_skill_schema.dump(magic_skills, many=True)


@catch_errors
def get_magic_skill_by_id(skill_id):
    magic_skill = MagicSkill.query.filter_by(id=skill_id).one()

    return magic_skill_schema.dump(magic_skill)

# ----------------------------------------------------------------------------------------------------------------
# Course


@catch_errors
def get_all_courses():
    courses = Course.query.all()

    return course_schema.dump(courses, many=True)


@catch_errors
def get_course_by_id(course_id):
    course = Course.query.filter_by(id=course_id).one()

    return course_schema.dump(course)


def get_course_student_counts():
    courses_counts = db.session.query(Course.title, db.func.count(CourseAssociation.course_id))\
        .outerjoin(CourseAssociation, CourseAssociation.course_id == Course.id)\
        .group_by(Course.title).all()

    return [
        {
            'title': course[0],
            'numOfStudents': course[1]
        } for course in courses_counts
    ]


def get_magic_skill_student_counts():
    magic_skills = db.session.query(MagicSkill.title, db.func.count(MagicSkillAssociation.skill_id))\
        .outerjoin(MagicSkillAssociation, MagicSkillAssociation.skill_id == MagicSkill.id)\
        .group_by(MagicSkill.title).all()

    return [
        {
            'title': ma[0],
            'numOfStudents': ma[1],
        } for ma in magic_skills
    ]


months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
]


def get_students_added_per_month():
    counts = db.session.query(db.func.count(Student.id)).group_by(db.func.strftime("%m", Student.date_created)).all()

    return [
        {
            'month': months[i],
            'numOfStudents': counts[i][0],
        } for i in range(12)]
