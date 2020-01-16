import React from 'react';
import StudentDetails from './pages/StudentDetails';
import StudentManager from './pages/StudentManager';
import CourseManager from './pages/CourseManager';
import MagicSkill from './pages/MagicSkillManager';
import MiniDrawer from './components/MiniDrawer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<Router>
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
					<Route exact path='/course'>
						<CourseManager />
					</Route>
					<Route exact path='/magicskills'>
						<MagicSkill />
					</Route>
					<Route exact path='/student/:id'>
						Student
					</Route>
				</Switch>
			</MiniDrawer>
		</Router>
	);
}

export default App;
