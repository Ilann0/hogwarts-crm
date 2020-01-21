from random import randint, choice
import datetime
from json import dumps
import requests
from f.names import names

# Very dirty but works

for name in names:
    courses = list(set(randint(1, 5) for _ in range(randint(1, 5))))
    magic_skills = list(set((randint(1, 18), randint(1, 5), choice(['aquired', 'desired'])) for _ in range(randint(2, 10))))

    student = {
        'courses_of_interest': [{
            'id': course
        } for course in courses],
        'first_name': name.split(' ')[0],
        'last_name': name.split(' ')[1],
        'magic_skills': [{
            'id': skill[0],
            'skill_level': skill[1],
            'skill_category': skill[2],
        } for skill in magic_skills],
    }

    requests.post('http://localhost:5000/student', json=student)
