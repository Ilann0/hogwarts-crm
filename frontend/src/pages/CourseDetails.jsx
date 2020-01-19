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

import { deleteCourse, addNewCourse, updateCourse } from '../api';
import {
	fetchCourse,
	setCourseTitle,
	resetCourse,
} from '../redux/actions/CourseActions';

function CourseDetails(props) {
	const classes = useStyles();

	const state = useSelector(state => state.course);
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
			addNewCourse(state);
		} else {
			updateCourse(state);
		}
	}
	const { title, loading } = state;
	return (
		<>
			{!loading && (
				<Container component={Paper} className={classes.root}>
					<div className={classes.titleContainer}>
						<h1 className={classes.title}>
							{isCreateMode ? 'Create Course' : 'Edit Course'}
						</h1>
						{!isCreateMode && (
							<Button
								color='secondary'
								onClick={() => {
									deleteCourse(course_id);
								}}
								variant='contained'
							>
								Delete
							</Button>
						)}
					</div>
					{/* <form onSubmit={e => handleSubmit(e)}> */}
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
					{/* </form> */}
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
			)}
		</>
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
