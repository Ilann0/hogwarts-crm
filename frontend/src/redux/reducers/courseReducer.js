import { createReducer } from '@reduxjs/toolkit';

const initialState = {
	title: '',
	id: 0,
};

export const courseReducer = createReducer(initialState, {
	INIT_COURSE: (state, action) => {
		return { ...state, ...action.payload };
	},
	RESET_COURSE: (state, action) => {
		return initialState;
	},
	TOGGLE_LOADING: (state, _) => {
		state.loading = !state.loading;
	},
	UPDATE_COURSE_TITLE: (state, action) => {
		state['title'] = action.payload;
	},
	REMOVE_COURSE: (state, action) => {
		return {};
	},
});
