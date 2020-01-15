from .models import MagicSkillAssociation, Student, MagicSkill, Course, CourseAssociation
from app import marshmallow as ma


class MagicSkillSchema(ma.ModelSchema):
    class Meta:
        model = MagicSkill


class MagicSkillAssociationSchema(ma.ModelSchema):
    class Meta:
        model = MagicSkillAssociation

    magic_skill = ma.Nested(MagicSkillSchema, exclude=('id',))


class CourseSchema(ma.ModelSchema):
    class Meta:
        model = Course


class CourseAssociationSchema(ma.ModelSchema):
    class Meta:
        model = CourseAssociation

    course = ma.Nested(CourseSchema)


class StudentSchema(ma.ModelSchema):
    class Meta:
        model = Student

    courses_of_interest = ma.Nested(CourseAssociationSchema, many=True)
    magic_skills = ma.Nested(MagicSkillAssociationSchema, many=True)
