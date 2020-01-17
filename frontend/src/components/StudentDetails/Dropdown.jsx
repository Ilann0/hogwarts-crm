import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

function Dropdown(props) {
	const { value = '', title = 'Title', items = [], handleChange } = props;
	return (
		<FormControl variant='filled' className={classes.formControl}>
			<InputLabel id={'select-field-label' + title}>{title}</InputLabel>
			<Select
				labelId='select-field-label'
				id='select'
				value={value}
				onChange={handleChange}
			>
				<MenuItem value=''>
					<em>Select an option</em>
				</MenuItem>
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
