import React from 'react';
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
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
}));

function Dropdown(props) {
	const classes = useStyles();

	const {
		title = 'Title',
		items = [],
		emptySelect = false,
		initVal,
		useTitle,
		selectClassName = '',
		...rest
	} = props;
	return (
		<FormControl
			variant='filled'
			className={classes.formControl + ' ' + selectClassName}
		>
			<InputLabel id={'select-field-label' + title}>{title}</InputLabel>
			<Select
				labelId='select-field-label'
				id='select'
				value={initVal}
				{...rest}
			>
				{emptySelect ? (
					<MenuItem value={false} className={classes.selectEmpty}>
						<em></em>
					</MenuItem>
				) : (
					<></>
				)}
				{items.map(item => (
					<MenuItem
						key={item.title + item.id}
						value={useTitle ? item.title : item.id}
						id={item.title}
						name={item.id}
					>
						{item.title}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default Dropdown;
