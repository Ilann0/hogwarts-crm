import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dropdown from '../components/StudentDetails/SkillRow/Dropdown';
import { getStudentById, getSkills, getCourses } from '../api';
import CustSlider from '../components/StudentDetails/SkillRow/CustSlider';
import SkillRow from '../components/StudentDetails/SkillRow';

// {
//   "courses_of_interest": [
//     {
//       "id": 1,
//       "title": "Alchemy basics"
//     },
//     {
//       "id": 3,
//       "title": "Magic for day-to-day life"
//     }
//   ],
//   "date_created": "2020-01-16T12:10:49.379552",
//   "first_name": "Batata",
//   "id": 1,
//   "last_name": "Benkamoun",
//   "last_update": "2020-01-16T12:10:49.379565",
//   "magic_skills": [
//     {
//       "id": 4,
//       "skill_category": "desired",
//       "skill_level": 1,
//       "title": "Disintegration"
//     },
//     {
//       "id": 8,
//       "skill_category": "aquired",
//       "skill_level": 5,
//       "title": "Immortality"
//     }
//   ]
// }

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
	skillRow: {
		display: 'flex',
		justifyContent: 'space-evenly',
	},
	slider: {
		minWidth: 300,
	},
}));

function StudentDetails(props) {
	const classes = useStyles();
	const [info, setInfo] = useState({});
	const [skills, setSkills] = useState([]);
	const [courses, setCourses] = useState([]);
	const { location } = props;
	const student_id = parseInt(location.pathname.split('/')[2]);

	useEffect(() => {
		getStudentById(student_id).then(res => setInfo(res.data));
		getSkills().then(res => setSkills(res.data));
		getCourses().then(res => setCourses(res.data));
	}, [student_id]);

	function handleSubmit(e) {
		e.preventDefault();
		console.log(info);
		debugger;
	}
	const { first_name, last_name, magic_skills } = info;
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
				{magic_skills &&
					magic_skills.map(skill => (
						<SkillRow
							initSlider={skill.skill_level}
							dropOneItems={skills}
							initDropOne={skill.id}
							initDropTwo={skill.skill_category}
						/>
					))}
				<Dropdown items={courses} title='Courses' initVal={2} />
				<Button variant='contained' type='submit' color='primary'>
					Edit
				</Button>
			</form>
			hello
		</Container>
	);
}

export default withRouter(StudentDetails);
