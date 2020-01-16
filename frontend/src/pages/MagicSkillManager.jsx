import React, { useState, useEffect } from 'react';
import SimpleTable from '../components/SimpleTable';
import axios from 'axios';

function MagicSkillManager() {
	const [magicSkills, setMagicSkills] = useState([]);

	useEffect(() => {
		axios.get('http://127.0.0.1:5000/magicskills').then(res => {
			const magicSkills = [];
			for (const magicSkill of res.data) {
				const { id, title } = magicSkill;
				magicSkills.push([id, title]);
			}
			setMagicSkills(magicSkills);
		});
	}, []);

	return (
		<>
			<SimpleTable
				routeName='magicskill'
				rowTitles={['ID', 'title']}
				dataList={magicSkills}
			/>
		</>
	);
}

export default MagicSkillManager;
