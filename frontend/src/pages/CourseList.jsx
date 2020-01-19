import React, { useState, useEffect } from 'react';
import SimpleTable from '../components/SimpleTable';
import axios from 'axios';

function CourseList() {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		axios.get('http://127.0.0.1:5000/courses').then(res => {
			const courses = [];
			for (const course of res.data) {
				const { id, title } = course;
				courses.push([id, title]);
			}
			setCourses(courses);
		});
	}, []);

	return (
		<>
			<SimpleTable
				tableTitle='Courses'
				routeName='course'
				rowTitles={['ID', 'title']}
				dataList={courses}
			/>
		</>
	);
}

export default CourseList;
