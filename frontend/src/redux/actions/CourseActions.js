import { createAction } from '@reduxjs/toolkit';

import { getCourseById } from '../../api';
import { serverErrorMsg } from './errorMessage';

import { toggleLoading, setFetchingError } from './globalActions';

export const initCourse = createAction('INIT_COURSE');

export const setCourseTitle = createAction('UPDATE_COURSE_TITLE');

export const resetCourse = createAction('RESET_COURSE');

export const setMessage = createAction('SET_SERVER_MESSAGE');

export const fetchCourse = id => dispatch => {
	dispatch(toggleLoading());
	getCourseById(id)
		.then(res => {
			dispatch(initCourse(res.data));
			dispatch(toggleLoading());
		})
		.catch(() => {
			dispatch(setFetchingError(serverErrorMsg));
		});
};
