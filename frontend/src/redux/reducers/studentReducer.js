import { createReducer } from '@reduxjs/toolkit';

const initialState = {
	courses_of_interest: [],
	first_name: '',
	last_name: '',
	magic_skills: [],
};

export const studentReducer = createReducer(initialState, {
	TOGGLE_LOADING: (state, _) => {
		state.loading = !state.loading;
	},
	INIT_STUDENT: (state, action) => {
		return { ...action.payload };
	},
	RESET_STUDENT: (state, action) => {
		return initialState;
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
		let flag = true;
		state.courses_of_interest.forEach(course => {
			if (
				course.id === action.payload.id &&
				course.meta.isDeleted &&
				!course.meta.isNew
			) {
				course.meta.isDeleted = false;
				flag = false;
			}
		});
		if (flag) state.courses_of_interest.push(action.payload);
	},
	REMOVE_STUDENT_COURSE: (state, action) => {
		state.courses_of_interest.forEach((course, index) => {
			if (course.id === action.payload)
				if (course.meta.isNew)
					state.courses_of_interest.splice(index, 1);
				else course.meta.isDeleted = true;
		});
	},
});
