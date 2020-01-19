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

import { deleteMagicSkill, addNewMagicSkill, updateMagicSkill } from '../api';
import {
	fetchMagicSkill,
	setSkillTitle,
	resetMagicSkill,
} from '../redux/actions/magicSkillActions';

function CourseDetails(props) {
	const classes = useStyles();

	const state = useSelector(state => state.magicSkill);
	const dispatch = useDispatch();

	const { isCreateMode, location, history } = props;

	const magicSkillId = parseInt(location.pathname.split('/')[2]);

	useEffect(() => {
		if (!isCreateMode) {
			dispatch(fetchMagicSkill(magicSkillId));
		}
		return () => {
			dispatch(resetMagicSkill());
		};
	}, [magicSkillId, dispatch, isCreateMode]);

	function handleSave() {
		if (isCreateMode) {
			addNewMagicSkill(state);
		} else {
			updateMagicSkill(state);
		}
	}
	const { title, loading } = state;
	return (
		<>
			{!loading && (
				<Container component={Paper} className={classes.root}>
					<div className={classes.titleContainer}>
						<h1 className={classes.title}>
							{isCreateMode
								? 'Create Magic Skill'
								: 'Edit Magic Skill'}
						</h1>
						{!isCreateMode && (
							<Button
								color='secondary'
								onClick={() => {
									deleteMagicSkill(magicSkillId);
								}}
								variant='contained'
							>
								Delete
							</Button>
						)}
					</div>
					<div className={classes.line}>
						<TextField
							label='Magic skill name'
							variant='outlined'
							value={title}
							className={classes.textField}
							onChange={e => {
								dispatch(setSkillTitle(e.target.value));
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
