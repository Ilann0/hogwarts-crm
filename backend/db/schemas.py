from .models import MagicSkillAssociation, Student, MagicSkill, Course, CourseAssociation
from app import marshmallow as ma
from marshmallow import fields, post_dump


class MagicSkillSchema(ma.ModelSchema):
    class Meta:
        model = MagicSkill


class MagicSkillAssociationSchema(ma.ModelSchema):
    magic_skill = ma.Nested(MagicSkillSchema)

    class Meta:
        model = MagicSkillAssociation

    @post_dump
    def make_dump(self, data, *args, **kwargs):
        print(data)
        return {
            'id': data['magic_skill']['id'],
            'title': data['magic_skill']['title'],
            'skill_category': data['skill_category'],
            'skill_level': data['skill_level'],
            'meta': {
                'isNew': False,
                'isModified': False,
                'isDeleted': False,
            }
        }


class CourseSchema(ma.ModelSchema):
    class Meta:
        model = Course


class CourseAssociationSchema(ma.ModelSchema):
    course = ma.Nested(CourseSchema)

    class Meta:
        model = CourseAssociation

    @post_dump
    def make_dump(self, data, *args, **kwargs):
        print(data)
        return {
            'id': data['course']['id'],
            'title': data['course']['title'],
        }


class StudentSchema(ma.ModelSchema):
    class Meta:
        model = Student

    courses_of_interest = ma.Nested(CourseAssociationSchema, many=True)
    magic_skills = ma.Nested(MagicSkillAssociationSchema, many=True)
