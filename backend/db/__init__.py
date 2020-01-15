from .models import db
from .schemas import StudentSchema, CourseSchema, MagicSkillSchema, MagicSkillAssociationSchema
from .helpers import *
from .initial_data import courses, magic_skills


def init_database():
    db.create_all()
    for course in courses:
        add_new_course({'course_title': course})
    for magic_skill in magic_skills:
        add_new_magic_skill({'skill_title': magic_skill})
