import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CustSlider from './SkillRow/CustSlider';
import Dropdown from './SkillRow/Dropdown';

const useStyles = makeStyles(theme => ({
	skillRow: {
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginTop: theme.spacing(1),
	},
	slider: {
		minWidth: 300,
	},
}));

function SkillRow(props) {
	const classes = useStyles();
	const {
		sliderTitle = 'Skill Level',
		initSlider = 1,
		dropOneTitle = 'Magic Skill',
		dropOneItems = [],
		initDropOne = '',
		dropTwoTitle = 'Category',
		dropTwoItems = [
			{ title: 'desired', id: 'desired' },
			{ title: 'aquired', id: 'aquired' },
		],
		initDropTwo = '',
	} = props;
	return (
		<div className={classes.skillRow}>
			<CustSlider
				title={sliderTitle}
				initVal={initSlider}
				className={classes.slider}
				emptySelect
			/>
			<Dropdown
				title={dropOneTitle}
				items={dropOneItems}
				initVal={initDropOne}
				emptySelect
			/>
			<Dropdown
				title={dropTwoTitle}
				items={dropTwoItems}
				initVal={initDropTwo}
				emptySelect={initDropTwo == '' ? true : false}
			/>
			<Fab color='secondary'>
				<DeleteForeverIcon />
			</Fab>
		</div>
	);
}

export default SkillRow;
