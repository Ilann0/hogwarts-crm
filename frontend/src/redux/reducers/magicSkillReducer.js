import { createReducer } from '@reduxjs/toolkit';

const initialState = {
	title: '',
	id: 0,
};

export const magicSkillReducer = createReducer(initialState, {
	INIT_MAGIC_SKILL: (state, action) => {
		return { ...state, ...action.payload };
	},
	TOGGLE_LOADING: (state, _) => {
		state.loading = !state.loading;
	},
	UPDATE_MAGIC_SKILL: (state, action) => {
		state['title'] = action.payload;
	},
	RESET_MAGIC_SKILL: (state, action) => {
		return initialState;
	},
});
