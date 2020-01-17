import axios from 'axios';

const URL = 'http://127.0.0.1:5000';

export function getStudentById(id) {
	return axios.get(URL + '/student/' + id);
}

export function getCourses() {
	return axios.get(URL + '/courses');
}

export function getSkills() {
	return axios.get(URL + '/magicskills');
}
