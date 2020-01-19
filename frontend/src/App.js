import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import StudentDetails from './pages/StudentDetails';
import StudentList from './pages/StudentList';
import CourseList from './pages/CourseList';
import MagicSkillList from './pages/MagicSkillList';
import MiniDrawer from './components/Navigation/MiniDrawer';
import CourseDetails from './pages/CourseDetails';
import MagicSkillDetails from './pages/MagicSkillDetails';
import './App.css';

function App() {
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
		<Router>
			<ThemeProvider theme={theme}>
				<MiniDrawer title='Hogwarts Management'>
					<Switch>
						<Route exact path='/'>
							Home
						</Route>
						<Route exact path='/dashboard'>
							Dashboard
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
			</ThemeProvider>
		</Router>
	);
}

export default App;
