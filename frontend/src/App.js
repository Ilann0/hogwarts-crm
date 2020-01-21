import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Dashboard from './pages/Dashboard';
import MiniDrawer from './components/Navigation/MiniDrawer';
import StudentList from './pages/Student/StudentList';
import StudentDetails from './pages/Student/StudentDetails';
import CourseList from './pages/Course/CourseList';
import CourseDetails from './pages/Course/CourseDetails';
import MagicSkillList from './pages/MagicSkill/MagicSkillList';
import MagicSkillDetails from './pages/MagicSkill/MagicSkillDetails';
import './App.css';

function App(props) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
					primary: {
						main: '#648dae',
					},
					secondary: {
						main: '#FF4500',
					},
				},
			}),
		[prefersDarkMode]
	);
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<MiniDrawer title='Hogwarts Management'>
					<Switch>
						<Route exact path='/'>
							<Dashboard />
						</Route>
						<Route exact path='/students'>
							<StudentList />
						</Route>
						<Route exact path='/student/create'>
							<StudentDetails isCreateMode />
						</Route>
						<Route exact path='/student/:id'>
							<StudentDetails />
						</Route>
						<Route exact path='/courses'>
							<CourseList />
						</Route>
						<Route exact path='/course/create'>
							<CourseDetails isCreateMode />
						</Route>
						<Route exact path='/course/:id'>
							<CourseDetails />
						</Route>
						<Route exact path='/magicskills'>
							<MagicSkillList />
						</Route>
						<Route exact path='/magicskill/create'>
							<MagicSkillDetails isCreateMode />
						</Route>
						<Route exact path='/magicskill/:id'>
							<MagicSkillDetails />
						</Route>
					</Switch>
				</MiniDrawer>
			</Router>
		</ThemeProvider>
	);
}

export default App;
