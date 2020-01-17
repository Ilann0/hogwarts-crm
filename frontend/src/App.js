import React from 'react';
import StudentDetails from './pages/StudentDetails';
import StudentManager from './pages/StudentManager';
import CourseManager from './pages/CourseManager';
import MagicSkill from './pages/MagicSkillManager';
import MiniDrawer from './components/MiniDrawer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
							<StudentManager />
						</Route>
						<Route exact path='/courses'>
							<CourseManager />
						</Route>
						<Route exact path='/magicskills'>
							<MagicSkill />
						</Route>
						<Route exact path='/student/:id'>
							<StudentDetails />
						</Route>
					</Switch>
				</MiniDrawer>
			</ThemeProvider>
		</Router>
	);
}

export default App;
