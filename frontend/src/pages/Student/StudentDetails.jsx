import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Container, Button, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import SkillRow from '../../components/StudentDetails/SkillRow';
import {
	getSkills,
	getCourses,
	addNewStudent,
	updateStudent,
	deleteStudent,
} from '../../api';
import { commonServerAction } from '../../redux/actions/generalServerFunc';
import {
	fetchStudent,
	setFirstName,
	setLastName,
	addSkill,
	resetStudent,
} from '../../redux/actions/studentActions';

function StudentDetails(props) {
	const classes = useStyles();
	const [skillsList, setSkillsList] = useState([]);
	const [coursesList, setCoursesList] = useState([]);
	const state = useSelector(state => state.student);
	const fetchingError = useSelector(state => state.global.fetchingError);
	const dispatch = useDispatch();

	const { location, history } = props;

	const student_id = parseInt(location.pathname.split('/')[2]);

	useEffect(() => {
		getSkills().then(res => {
			setSkillsList(res.data);
		});
		getCourses().then(res => {
			setCoursesList(res.data);
		});

		if (!props.isCreateMode) {
			dispatch(fetchStudent(student_id));
		}
		return () => {
			dispatch(resetStudent());
		};
	}, [student_id, dispatch, props.isCreateMode]);

	function handleSave() {
		if (props.isCreateMode) {
			dispatch(commonServerAction(state, addNewStudent));
			if (!fetchingError) history.goBack();
		} else {
			dispatch(commonServerAction(state, updateStudent));
		}
	}

	function handleDelete() {
		dispatch(commonServerAction(student_id, deleteStudent));
		if (!fetchingError) history.goBack();
	}

	const {
		first_name,
		last_name,
		magic_skills,
		// courses_of_interest,
	} = state;
	return (
		<Container component={Paper} className={classes.root}>
			<div className={classes.titleContainer}>
				<h1 className={classes.title}>
					{props.isCreateMode ? 'Create Student' : 'Edit Student'}
				</h1>
				{!props.isCreateMode && (
					<Button
						color='secondary'
						onClick={handleDelete}
						variant='contained'
					>
						Delete
					</Button>
				)}
			</div>
			<div className={classes.line}>
				<TextField
					label='First name'
					variant='outlined'
					value={first_name}
					className={classes.textField}
					onChange={e => {
						dispatch(setFirstName(e.target.value));
					}}
				/>
				<TextField
					label='Last name'
					value={last_name}
					// value={info.last_name}
					variant='outlined'
					className={classes.textField}
					onChange={e => {
						dispatch(setLastName(e.target.value));
					}}
				/>
			</div>
			{magic_skills &&
				magic_skills.map((skill, index) => {
					return !skill.meta.isDeleted ? (
						<SkillRow
							initSlider={skill.skill_level}
							dropOneItems={skillsList}
							initDropOne={skill.id}
							initDropTwo={skill.skill_category}
							index={index}
						/>
					) : (
						<></>
					);
				})}
			<div className={classes.bottomBtnRow}>
				<Button
					variant='contained'
					onClick={handleSave}
					color='primary'
				>
					Save
				</Button>
				<Button
					variant='contained'
					onClick={() => dispatch(addSkill())}
				>
					Add Skill
				</Button>
			</div>
		</Container>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	titleContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(2),
	},
	line: {
		display: 'flex',
		justifyContent: 'space-evenly',
		marginBottom: theme.spacing(3),
	},
	textField: {
		flexGrow: 1,
		margin: theme.spacing(0, 3),
	},
	skillRow: {
		display: 'flex',
		justifyContent: 'space-evenly',
	},
	slider: {
		minWidth: 300,
	},
	bottomBtnRow: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: theme.spacing(3),
		paddingBottom: theme.spacing(1),
		paddingTop: theme.spacing(4),
	},
}));

export default withRouter(StudentDetails);
