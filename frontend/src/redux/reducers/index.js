import { studentReducer } from './studentReducer';
import { courseReducer } from './courseReducer';
import { magicSkillReducer } from './magicSkillReducer';
import { combineReducers } from 'redux';

export default combineReducers({
	student: studentReducer,
	course: courseReducer,
	magicSkill: magicSkillReducer,
});
