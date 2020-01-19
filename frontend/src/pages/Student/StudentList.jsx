import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SimpleTable from '../../components/SimpleTable';
import { getStudents } from '../../api';
import {
	setFetchingError,
	toggleLoading,
	// resetGlobalState,
} from '../../redux/actions/globalActions';
import { serverErrorMsg } from '../../redux/actions/errorMessage';

function StudentList() {
	const [students, setStudents] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(toggleLoading());
		getStudents()
			.then(res => {
				const students = res.data.map(student => [
					student.id,
					student.first_name + ' ' + student.last_name,
					student.date_created,
					student.last_update,
				]);
				setStudents(students);
				dispatch(toggleLoading());
			})
			.catch(() => {
				dispatch(setFetchingError(serverErrorMsg));
			});
	}, [dispatch]);

	return (
		<>
			<SimpleTable
				tableTitle='Students'
				routeName='student'
				rowTitles={['ID', 'Full Name', 'Date Created', 'Last Update']}
				dataList={students}
			/>
		</>
	);
}

export default StudentList;
