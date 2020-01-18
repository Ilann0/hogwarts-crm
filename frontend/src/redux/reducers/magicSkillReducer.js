import { createReducer } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
};

export const magicSkillReducer = createReducer(initialState, {
	INIT_MAGIC_SKILL: (state, action) => {
		return { ...state, ...action.payload };
	},
	TOGGLE_LOADING: (state, _) => {
		state.loading = !state.loading;
	},
	UPDATE_MAGIC_SKILL: (state, action) => {
		state[action.id]['title'] = action.payload;
	},
	REMOVE_SKILL: (state, action) => {
		return {};
	},
});
