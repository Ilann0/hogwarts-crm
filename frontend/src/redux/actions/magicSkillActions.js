import { createAction } from '@reduxjs/toolkit';
import { getSkillById } from '../../api';

export const initMagicSkills = createAction('INIT_MAGIC_SKILLS');
export const toggleLoading = createAction('TOGGLE_LOADING');
export const setSkillTitle = createAction('UPDATE_MAGIC_SKILL');

const fetchMagicSkills = id => dispatch => {
	dispatch(toggleLoading);
	getSkillById(id).then(res => {
		dispatch(initMagicSkills(res.data));
		dispatch(toggleLoading);
	});
};
