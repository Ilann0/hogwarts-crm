import React, { useState, useEffect } from 'react';
import SimpleTable from '../components/SimpleTable';
import axios from 'axios';

function StudentManager() {
	const [students, setStudents] = useState([]);
	useEffect(() => {
		axios.get('http://127.0.0.1:5000/students').then(res => {
			const students = [];
			for (const student of res.data) {
				const {
					id,
					first_name,
					last_name,
					date_created,
					last_update,
				} = student;

				students.push([
					id,
					first_name + ' ' + last_name,
					date_created,
					last_update,
				]);
			}
			setStudents(students);
		});
	}, []);
	return (
		<>
			<SimpleTable
				routeName='student'
				rowTitles={['ID', 'Full Name', 'Date Created', 'Last Update']}
				dataList={students}
			/>
		</>
	);
}

export default StudentManager;
