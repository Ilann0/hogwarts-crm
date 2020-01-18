import { createAction } from '@reduxjs/toolkit';
import { getStudentById } from '../../api';

const initStudent = createAction('INIT_STUDENT');
const toggleLoading = createAction('TOGGLE_LOADING');
export const setSkillLevel = createAction('UPDATE_SKILL_LEVEL');
export const setSkill = createAction('UPDATE_STUDENT_SKILL');
export const setFirstName = createAction('UPDATE_STUDENT_FNAME');
export const setLastName = createAction('UPDATE_STUDENT_LNAME');
export const setSkills = createAction('UPDATE_STUDENT_SKILLS');
export const addSkill = createAction('ADD_STUDENT_SKILL');
export const removeSkill = createAction('REMOVE_STUDENT_SKILL');
export const addCourse = createAction('ADD_STUDENT_COURSE');
export const removeCourse = createAction('REMOVE_STUDENT_COURSE');

export const fetchStudent = id => dispatch => {
	dispatch(toggleLoading());
	getStudentById(id).then(res => {
		dispatch(initStudent(res.data));
		dispatch(toggleLoading());
	});
};
