from db.schemas import StudentSchema, CourseSchema, MagicSkillSchema, MagicSkillAssociationSchema
from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation
# ----------------------------------------------------------------------------------------------------------------
# Student

student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

magic_skill_schema = MagicSkillSchema()
magic_skills_schema = MagicSkillSchema(many=True)

magic_skill_assoc_schema = MagicSkillAssociationSchema()
magic_skills_assoc_schema = MagicSkillAssociationSchema(many=True)

def get_all_students():
    students = Student.query.all()
    return students_schema.dump(students)


def get_students_by(*args, **kwargs):
    students = Student.query.filter_by(**kwargs).all()
    return students_schema.dump(students)


def get_student_by_id(student_id):
    student = Student.query.get(student_id)
    return student_schema.dump(student)


def get_all_student_skills(student_id):
    student = Student.query.get(student_id).magic_skills
    return student_schema.dump(student)


def get_student_aquired_skills(student_id):
    student = Student.query.get(student_id)
    associations = [association for association in student.magic_skills if association.skill_category == 'aquired']
    print(magic_skill_assoc_schema.dump(associations))
    return magic_skill_assoc_schema.dump(associations)

# def get_student_aquired_skills(student_id):
#     student = Student.query.get(student_id)
#     associations = [association for association in student.magic_skills if association.skill_category == 'aquired']
#     return magic_skills_assoc_schema.dump(associations)


def get_student_desired_skills(student_id):
    student = Student.query.get(student_id)
    skills = [skill for skill in student.magic_skills if skill.skill_category == 'desired']
    return magic_skills_assoc_schema.dump(skills)


def get_student_courses(student_id):
    courses = Student.query.get(student_id).courses_of_interest
    return courses_schema.dump(courses)


# ----------------------------------------------------------------------------------------------------------------
# MagicSkill

def get_all_magic_skills():
    pass


def get_magic_skill_by_id(skill_id):
    return MagicSkill.query.get(skill_id)


def get_magic_skills_by_title(skill_title):
    return MagicSkill.query.filter_by(title=skill_title.capitalize()).all()


def get_magic_skill_students(skill_id):
    return MagicSkill.query.get(skill_id).students


# ----------------------------------------------------------------------------------------------------------------
# Course
def get_all_courses():
    return Course.query.all()


def get_course_by_id(course_id):
    return Course.query.get(course_id)


def get_course_by_title(course_title):
    return Course.query.filter_by(title=course_title.capitalize()).all()


def get_course_students(course_id):
    return Course.query.get(course_id).interested_students


# ----------------------------------------------------------------------------------------------------------------
# MagicSkillAssociation
