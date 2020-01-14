from db.models import db, Student, Course, MagicSkill, MagicSkillAssociation, CourseAssociation
# ----------------------------------------------------------------------------------------------------------------
# Tables


def add_new_student(first_name, last_name):
    student = Student(first_name=first_name.capitalize(), last_name=last_name.capitalize())
    db.session.add(student)
    db.session.commit()
    # return student


def add_new_course(course_title):
    course = Course(title=course_title.capitalize())
    db.session.add(course)
    db.session.commit()


def add_new_magic_skill(skill_title):
    skill = MagicSkill(title=skill_title.capitalize())
    db.session.add(skill)
    db.session.commit()


# ----------------------------------------------------------------------------------------------------------------
# Associations


def add_skill_to_student(student_id, skill_id, skill_level, skill_category):
    student = Student.query.get(student_id)
    association = MagicSkillAssociation(skill_level=skill_level, skill_category=skill_category)
    association.magic_skill = MagicSkill.query.get(skill_id)
    student.magic_skills.append(association)
    db.session.commit()

def add_course_to_student(student_id, course_id):
    student = Student.query.get(student_id)
    association = CourseAssociation()
    association.course = Course.query.get(course_id)
    student.courses_of_interest.append(association)
    db.session.commit()

# def add_course_to_student(student_id, course_id):
#     course = Course.query.get(course_id)
#     student = Student.query.get(student_id)
#     student.courses_of_interest.append(course)
#     db.session.commit()
