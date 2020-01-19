import { createAction } from '@reduxjs/toolkit';
import { getCourseById } from '../../api';

export const initCourse = createAction('INIT_COURSE');
export const toggleLoading = createAction('TOGGLE_LOADING');
export const setCourseTitle = createAction('UPDATE_COURSE_TITLE');
export const resetCourse = createAction('RESET_COURSE');

export const fetchCourse = id => dispatch => {
	dispatch(toggleLoading);
	getCourseById(id).then(res => {
		dispatch(initCourse(res.data));
		dispatch(toggleLoading);
	});
};
