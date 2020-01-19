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
    #
    # s = Student.query.get(1)
    # s2 = Student.query.get(2)
    # add_skill_to_student(s, 8, 2, 'desired')
    # add_skill_to_student(s, 3, 4, 'aquired')
    # add_skill_to_student(s2, 4, 2, 'desired')
    # add_skill_to_student(s2, 2, 2, 'aquired')
    # add_course_to_student(s, 1)
    # add_course_to_student(s, 2)
    # add_course_to_student(s, 3)
    # add_course_to_student(s, 4)
    # db.session.commit()
