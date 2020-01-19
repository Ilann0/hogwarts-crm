import React, { useEffect } from 'react';
import {
	makeStyles,
	Button,
	Container,
	TextField,
	Paper,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';

import { deleteCourse, addNewCourse, updateCourse } from '../../api';
import {
	fetchCourse,
	setCourseTitle,
	resetCourse,
} from '../../redux/actions/CourseActions';
import { commonServerAction } from '../../redux/actions/generalServerFunc';

function CourseDetails(props) {
	const classes = useStyles();

	const state = useSelector(state => state.course);
	const fetchingError = useSelector(state => state.global.fetchingError);
	const dispatch = useDispatch();

	const { isCreateMode, location, history } = props;

	const course_id = parseInt(location.pathname.split('/')[2]);

	useEffect(() => {
		if (!isCreateMode) {
			dispatch(fetchCourse(course_id));
		}
		return () => {
			dispatch(resetCourse());
		};
	}, [course_id, dispatch, isCreateMode]);

	function handleSave() {
		if (isCreateMode) {
			dispatch(commonServerAction(state, addNewCourse));
			if (!fetchingError) history.goBack();
		} else {
			dispatch(commonServerAction(state, updateCourse));
		}
	}

	function handleDelete() {
		dispatch(commonServerAction(course_id, deleteCourse));
		if (!fetchingError) history.goBack();
	}

	const { title } = state;
	return (
		<Container component={Paper} className={classes.root}>
			<div className={classes.titleContainer}>
				<h1 className={classes.title}>
					{isCreateMode ? 'Create Course' : 'Edit Course'}
				</h1>
				{!isCreateMode && (
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
					label='Course name'
					variant='outlined'
					value={title}
					className={classes.textField}
					onChange={e => {
						dispatch(setCourseTitle(e.target.value));
					}}
				/>
			</div>
			<div className={classes.bottomBtnRow}>
				<Button
					variant='contained'
					onClick={handleSave}
					color='primary'
				>
					Save
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

export default withRouter(CourseDetails);
