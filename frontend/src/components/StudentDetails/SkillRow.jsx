import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CustSlider from './SkillRow/CustSlider';
import Dropdown from './SkillRow/Dropdown';
import { useDispatch } from 'react-redux';
import { setSkill, removeSkill } from '../../redux/actions/studentActions';

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
	const dispatch = useDispatch();

	function handleSlider(_, val) {
		dispatch(
			setSkill({
				index: props.index,
				data: {
					skill_level: val,
				},
			})
		);
	}

	function handleDropDownOne(e) {
		dispatch(
			setSkill({
				index: props.index,
				data: {
					title: e.target.id,
					id: e.target.value,
				},
			})
		);
	}

	function handleDropDownTwo(e) {
		console.log(e.target);
		dispatch(
			setSkill({
				index: props.index,
				data: {
					skill_category: e.target.value,
				},
			})
		);
	}

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
		index,
	} = props;
	return (
		<div className={classes.skillRow}>
			<Dropdown
				title={dropOneTitle}
				items={dropOneItems}
				initVal={initDropOne}
				emptySelect
				onChange={handleDropDownOne}
			/>
			<Dropdown
				title={dropTwoTitle}
				items={dropTwoItems}
				initVal={initDropTwo}
				emptySelect={initDropTwo === '' ? true : false}
				onChange={handleDropDownTwo}
			/>
			<CustSlider
				title={sliderTitle}
				initVal={initSlider}
				className={classes.slider}
				emptySelect
				onChange={handleSlider}
			/>
			<Fab color='secondary' onClick={() => dispatch(removeSkill(index))}>
				<DeleteForeverIcon />
			</Fab>
		</div>
	);
}

export default SkillRow;
