import { createReducer } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	// courses_of_interest: [
	// 	{
	// 		id: 1,
	// 		title: '',
	// 	},
	// ],
	// date_created: '',
	// first_name: '',
	// id: 1,
	// last_name: '',
	// last_update: '',
	// magic_skills: [
	// 	{
	// 		id: 1,
	// 		skill_category: '',
	// 		skill_level: 1,
	// 		title: '',
	// 	},
	// ],
};

export const studentReducer = createReducer(initialState, {
	TOGGLE_LOADING: (state, _) => {
		state.loading = !state.loading;
	},
	INIT_STUDENT: (state, action) => {
		return { ...state, ...action.payload };
	},
	UPDATE_STUDENT_FNAME: (state, action) => {
		state.first_name = action.payload;
	},
	UPDATE_STUDENT_LNAME: (state, action) => {
		state.last_name = action.payload;
	},
	UPDATE_SKILL_LEVEL: (state, action) => {
		const { index, data } = action.payload;
		state.magic_skills[index]['skill_level'] = data;
		state.magic_skills[index]['meta']['isModified'] = true;
	},
	UPDATE_STUDENT_SKILL: (state, action) => {
		const { index, data } = action.payload;
		state.magic_skills[index] = {
			...state.magic_skills[index],
			meta: {
				...state.magic_skills[index]['meta'],
				isModified: true,
			},
			...data,
		};
	},
	ADD_STUDENT_SKILL: (state, _) => {
		// console.log(state.magic_skills);
		state.magic_skills.push({
			id: '',
			skill_level: 1,
			skill_category: '',
			title: '',
			meta: {
				isNew: true,
				isModified: false,
				isDeleted: false,
			},
		});
	},
	REMOVE_STUDENT_SKILL: (state, action) => {
		if (!state.magic_skills[action.payload]['meta']['isNew'])
			state.magic_skills[action.payload]['meta'] = {
				isModified: false,
				isDeleted: true,
			};
		else state.magic_skills.splice(action.payload, 1);
	},
	ADD_STUDENT_COURSE: (state, action) => {
		state.courses_of_interest.append(action.payload);
	},
	REMOVE_STUDENT_COURSE: (state, action) => {
		state.courses_of_interests.pop(action.payload);
	},
});
