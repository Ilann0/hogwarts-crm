import axios from 'axios';

const URL = 'http://127.0.0.1:5000';

// ----------------------------------------------------
// Students

export function getStudentById(id) {
	return axios.get(URL + '/student/' + id);
}

export function addNewStudent(data) {
	return axios.post(URL + '/student', data);
}

export function updateStudent(data) {
	return axios.put(URL + '/student', data);
}

export function deleteStudent(id) {
	return axios.delete(URL + '/student/' + id);
}

// ----------------------------------------------------
// Courses

export function addNewCourse(data) {
	return axios.post(URL + '/course', data);
}

export function getCourses() {
	return axios.get(URL + '/courses');
}

export function getCourseById(id) {
	return axios.get(URL + '/course/' + id);
}

export function updateCourse(data) {
	return axios.put(URL + '/course', data);
}

export function deleteCourse(id) {
	return axios.delete(URL + '/course/' + id);
}

// ----------------------------------------------------
// Magic Skills

export function getSkills() {
	return axios.get(URL + '/magicskills');
}

export function getSkillById(id) {
	return axios.get(URL + '/magicskill/' + id);
}

export function addNewMagicSkill(data) {
	return axios.post(URL + '/magicskill', data);
}

export function updateMagicSkill(data) {
	return axios.put(URL + '/magicskill');
}

export function deleteMagicSkill(id) {
	return axios.delete(URL + '/magicskill/' + id);
}
