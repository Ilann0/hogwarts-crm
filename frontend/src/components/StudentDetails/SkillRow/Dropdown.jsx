import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 300,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
		height: theme.spacing(5),
	},
}));

function Dropdown(props) {
	const classes = useStyles();
	const [value, setValue] = useState(props.initVal);

	function handleChange(e) {
		setValue(e.target.value);
	}

	const { title = 'Title', items = [], emptySelect = false } = props;
	return (
		<FormControl variant='filled' className={classes.formControl}>
			<InputLabel id={'select-field-label' + title}>{title}</InputLabel>
			<Select
				labelId='select-field-label'
				id='select'
				value={value}
				onChange={handleChange}
			>
				{emptySelect && (
					<MenuItem value={false} className={classes.selectEmpty}>
						<em></em>
					</MenuItem>
				)}
				{items.map(item => (
					<MenuItem key={item.title + item.id} value={item.id}>
						{item.title}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default Dropdown;
