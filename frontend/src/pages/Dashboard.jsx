import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
	const [na, setNa] = useState('');
	useEffect(() => {
		axios
			.get('http://127.0.0.1:5000/student/1')
			.then(res => {
				console.log(res);
				setNa(res.data.message);
			})
			.catch(err => console.log(err));
	}, []);
	return <div>{na}</div>;
}
