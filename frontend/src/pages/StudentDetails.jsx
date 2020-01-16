import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentDetails() {
	const [info, setInfo] = useState({});
	useEffect(() => {
		axios
			.get('http://127.0.0.1:5000/student/1')
			.then(res => setInfo(res.data));
	}, []);
	return <div></div>;
}

export default StudentDetails;
