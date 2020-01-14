from .models import db
from .schemas import StudentSchema, CourseSchema, MagicSkillSchema, MagicSkillAssociationSchema
from .helpers import *
from .initial_data import courses, magic_skills


def init_database():
    db.create_all()
    for course in courses:
        add_new_course(course)

    for magic_skill in magic_skills:
        add_new_magic_skill(magic_skill)

    add_new_student('ilann', 'ohayon')
    add_new_student('sponge', 'bob')
    add_course_to_student(1, 1)
    add_skill_to_student(1, 1, 3, 'aquired')
    add_skill_to_student(2, 1, 3, 'aquired')
    add_skill_to_student(1, 2, 3, 'aquired')
    add_skill_to_student(1, 3, 2, 'desired')
