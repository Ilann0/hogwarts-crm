import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

{
  "courses_of_interest": [
    {
      "course": {
        "title": "Alchemy basics"
      }
    },
    {
      "course": {
        "title": "Magic for day-to-day life"
      }
    }
  ],
  "date_created": "2020-01-16T12:10:49.379552",
  "first_name": "Batata",
  "id": 1,
  "last_name": "Benkamoun",
  "last_update": "2020-01-16T12:10:49.379565",
  "magic_skills": [
    {
      "magic_skill": {
		"title": "Disintegration",
		"id": 1
      },
      "skill_category": "desired",
      "skill_level": 1
    },
    {
      "magic_skill": {
        "title": "Immortality"
      },
      "skill_category": "aquired",
      "skill_level": 5
    }
  ]
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	line: {
		display: 'flex',
		justifyContent: 'space-evenly',
	},
	textField: {
		flexGrow: 1,
		margin: theme.spacing(0, 3),
	},
}));

function StudentDetails(props) {
	const classes = useStyles();
	const [info, setInfo] = useState({});
	const { location } = props;
	const student_id = parseInt(location.pathname.split('/')[2]);

	useEffect(() => {
		axios
			.get(`http://127.0.0.1:5000/student/${student_id}`)
			.then(res => setInfo(res.data));
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		debugger;
	}
	const { first_name, last_name, courses, magic_skills } = info;
	const l = 'jdjd';
	return (
		<Container component={Paper} className={classes.root}>
			<h1>Edit Student</h1>
			<form onSubmit={e => handleSubmit(e)}>
				<div className={classes.line}>
					<TextField
						label='First name'
						variant='outlined'
						className={classes.textField}
					/>
					<TextField
						label='Last name'
						defaultValue={l}
						// value={info.last_name}
						variant='outlined'
						className={classes.textField}
					/>
				</div>
				{info.last_name}
				<Button variant='contained' type='submit' color='primary'>
					Edit
				</Button>
			</form>
			hello
		</Container>
	);
}

export default withRouter(StudentDetails);
