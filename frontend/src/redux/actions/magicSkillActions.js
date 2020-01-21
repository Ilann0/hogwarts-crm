import { createAction } from '@reduxjs/toolkit';

import { toggleLoading, setFetchingError } from './globalActions';
import { serverErrorMsg } from './errorMessage';
import { getSkillById } from '../../api';

export const initMagicSkill = createAction('INIT_MAGIC_SKILL');
export const setSkillTitle = createAction('UPDATE_MAGIC_SKILL');
export const resetMagicSkill = createAction('RESET_MAGIC_SKILL');

export const fetchMagicSkill = id => dispatch => {
	dispatch(toggleLoading());
	getSkillById(id)
		.then(res => {
			dispatch(initMagicSkill(res.data));
			dispatch(toggleLoading());
		})
		.catch(() => {
			dispatch(setFetchingError(serverErrorMsg));
		});
};
