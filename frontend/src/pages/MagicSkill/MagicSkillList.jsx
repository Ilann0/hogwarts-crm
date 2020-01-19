import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SimpleTable from '../../components/SimpleTable';
import { getSkills } from '../../api';
import { serverErrorMsg } from '../../redux/actions/errorMessage';
import {
	setFetchingError,
	toggleLoading,
} from '../../redux/actions/globalActions';

function MagicSkillList() {
	const [magicSkills, setMagicSkills] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(toggleLoading());
		getSkills()
			.then(res => {
				const magicSkills = [];
				for (const magicSkill of res.data) {
					const { id, title } = magicSkill;
					magicSkills.push([id, title]);
				}
				setMagicSkills(magicSkills);
				dispatch(toggleLoading());
			})
			.catch(() => {
				dispatch(setFetchingError(serverErrorMsg));
			});
	}, [dispatch]);

	return (
		<>
			<SimpleTable
				tableTitle='Magic Skills'
				routeName='magicskill'
				rowTitles={['ID', 'title']}
				dataList={magicSkills}
			/>
		</>
	);
}

export default MagicSkillList;
