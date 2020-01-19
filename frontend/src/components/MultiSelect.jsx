import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names = [
	'Oliver Hansen',
	'Van Henry',
	'April Tucker',
	'Ralph Hubbard',
	'Omar Alexander',
	'Carlos Abbott',
	'Miriam Wagner',
	'Bradley Wilkerson',
	'Virginia Andrews',
	'Kelly Snyder',
];

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function MultiSelect(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [personName, setPersonName] = React.useState([]);

	const handleChange = event => {
		setPersonName(event.target.value);
	};
	const { items } = props;
	return (
		<div>
			<InputLabel id='demo-mutiple-chip-label'>Chip</InputLabel>
			<Select
				labelId='demo-mutiple-chip-label'
				id='demo-mutiple-chip'
				multiple
				value={personName}
				onChange={handleChange}
				input={<Input id='select-multiple-chip' />}
				renderValue={selected => (
					<div className={classes.chips}>
						{selected.map(value => (
							<Chip
								key={value}
								label={value}
								className={classes.chip}
							/>
						))}
					</div>
				)}
				MenuProps={MenuProps}
			>
				{items.map(item => (
					<MenuItem
						key={item.id + item.title}
						value={item}
						style={getStyles(item, personName, theme)}
					>
						{item}
					</MenuItem>
				))}
			</Select>
		</div>
	);
}
