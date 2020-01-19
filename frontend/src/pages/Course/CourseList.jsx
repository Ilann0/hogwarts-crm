import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SimpleTable from '../../components/SimpleTable';
import { getCourses } from '../../api';
import { serverErrorMsg } from '../../redux/actions/errorMessage';
import {
	setFetchingError,
	toggleLoading,
} from '../../redux/actions/globalActions';

function CourseList() {
	const [courses, setCourses] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(toggleLoading());
		getCourses()
			.then(res => {
				const courses = res.data.map(course => [
					course.id,
					course.title,
				]);
				setCourses(courses);
				dispatch(toggleLoading());
			})
			.catch(() => {
				dispatch(setFetchingError(serverErrorMsg));
			});
	}, [dispatch]);

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
