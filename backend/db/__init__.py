from .models import db
from .schemas import StudentSchema, CourseSchema, MagicSkillSchema, MagicSkillAssociationSchema
from .helpers import *
from .initial_data import courses, magic_skills


def init_database():
    db.create_all()
    for course in courses:
        add_new_course({'title': course})
    for magic_skill in magic_skills:
        add_new_magic_skill({'title': magic_skill})

    add_new_student('ilann', 'ohayon')
    add_new_student('sponge', 'bob')
    db.session.commit()
