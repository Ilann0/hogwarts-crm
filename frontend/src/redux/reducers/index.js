import { studentReducer } from './studentReducer';
import { courseReducer } from './courseReducer';
import { magicSkillReducer } from './magicSkillReducer';
import { globalReducer } from './globalReducer';
import { combineReducers } from 'redux';

export default combineReducers({
	global: globalReducer,
	student: studentReducer,
	course: courseReducer,
	magicSkill: magicSkillReducer,
});
