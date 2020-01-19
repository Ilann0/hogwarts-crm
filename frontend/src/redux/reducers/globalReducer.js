import { createReducer } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	msg: '',
	fetchingError: false,
};

export const globalReducer = createReducer(initialState, {
	SET_SERVER_MESSAGE: (state, action) => {
		state.msg = action.payload;
	},
	SET_LOADING: (state, _) => {
		state.loading = !state.loading;
	},
	SET_FETCHING_ERROR: (state, action) => {
		state.fetchingError = true;
		state.msg = action.payload;
		state.loading = false;
	},
	RESET_GLOBAL_STATE: (state, action) => {
		return initialState;
	},
});
