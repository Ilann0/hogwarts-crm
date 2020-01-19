import { createAction } from '@reduxjs/toolkit';
import { getSkillById } from '../../api';

export const initMagicSkill = createAction('INIT_MAGIC_SKILL');
export const toggleLoading = createAction('TOGGLE_LOADING');
export const setSkillTitle = createAction('UPDATE_MAGIC_SKILL');
export const resetMagicSkill = createAction('RESET_MAGIC_SKILL');

export const fetchMagicSkill = id => dispatch => {
	dispatch(toggleLoading);
	getSkillById(id).then(res => {
		dispatch(initMagicSkill(res.data));
		dispatch(toggleLoading);
	});
};
