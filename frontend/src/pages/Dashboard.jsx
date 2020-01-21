import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, makeStyles } from '@material-ui/core';
import {
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
	ResponsiveContainer,
	AreaChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Area,
} from 'recharts';

import { getStats } from '../api';
import { serverErrorMsg } from '../redux/actions/errorMessage';
import {
	setFetchingError,
	toggleLoading,
} from '../redux/actions/globalActions';

function Dashboard() {
	const classes = useStyles();
	const [courses, setCourses] = useState([]);
	const [magicSkills, setMagicSkills] = useState([]);
	const [students, setStudents] = useState([]);
	const dispatch = useDispatch();

	const domain_max_courses =
		Math.ceil(Math.max(...courses.map(c => c.numOfStudents)) / 100) * 100;

	const domain_max_mas =
		Math.ceil(Math.max(...magicSkills.map(ma => ma.numOfStudents)) / 100) *
		100;

	function fetchAndSetData(from, using) {
		getStats(from)
			.then(res => {
				using(res.data);
			})
			.catch(() => {
				dispatch(setFetchingError(serverErrorMsg));
			});
	}

	useEffect(() => {
		dispatch(toggleLoading());
		fetchAndSetData('courses', setCourses);
		fetchAndSetData('magicskills', setMagicSkills);
		fetchAndSetData('students', setStudents);
		dispatch(toggleLoading());
	}, []);

	return (
		<>
			<h1>Dashboard</h1>
			<div className={classes.container}>
				<Card className={classes.topCard}>
					<CardHeader title={'Added students / Month'} />
					<CardHeader title={'Students / Course'} />
					<CardContent className={classes.card}>
						<ResponsiveContainer width='100%' height={300}>
							<AreaChart
								width={730}
								height={250}
								data={students}
								margin={{
									top: 10,
									right: 30,
									left: 0,
									bottom: 0,
								}}
							>
								<defs>
									<linearGradient
										id='colorUv'
										x1='0'
										y1='0'
										x2='0'
										y2='1'
									>
										<stop
											offset='5%'
											stopColor='#8884d8'
											stopOpacity={0.8}
										/>
										<stop
											offset='95%'
											stopColor='#8884d8'
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>
								<XAxis dataKey='month' />
								<YAxis domain={[0, 150]} />
								<CartesianGrid strokeDasharray='3 3' />
								<Tooltip />
								<Area
									type='monotone'
									dataKey='numOfStudents'
									stroke='#8884d8'
									fillOpacity={1}
									fill='url(#colorUv)'
								/>
							</AreaChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
				<Card>
					<CardHeader title={'Students / Course'} />
					<CardContent className={classes.card}>
						<ResponsiveContainer width='100%' height={300}>
							<RadarChart outerRadius={130} data={courses}>
								<PolarGrid />
								<PolarAngleAxis dataKey='title' />
								<PolarRadiusAxis
									angle={90}
									domain={[0, domain_max_courses]}
								/>
								<Radar
									name='Courses'
									dataKey='numOfStudents'
									stroke='#8884d8'
									fill='#8884d8'
									fillOpacity={0.6}
								/>
							</RadarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
				<Card>
					<CardHeader title={'Students / Magic Skill'} />
					<CardContent className={classes.card}>
						<ResponsiveContainer width='100%' height={300}>
							<RadarChart outerRadius={130} data={magicSkills}>
								<PolarGrid />
								<PolarAngleAxis dataKey='title' />
								<PolarRadiusAxis
									angle={90}
									domain={[0, domain_max_mas]}
								/>
								<Radar
									dataKey='numOfStudents'
									stroke='#8884d8'
									fill='#8884d8'
									fillOpacity={0.6}
								/>
							</RadarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

const useStyles = makeStyles(theme => {
	return {
		container: {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			gridTemplateRows: '1fr 1fr',
			gridGap: theme.spacing(3),
		},
		card: {
			display: 'flex',
			flexGrow: 1,
			minWidth: 275,
			justifyContent: 'center',
		},
		radar: {
			color: 'white',
			fill: 'white',
		},
		topCard: {
			width: '100%',
			gridColumn: '1 / span 2',
			gridRow: '1 / span 1',
		},
	};
});

export default Dashboard;
