import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from 'react-router-dom';

function MenuItem(props) {
	const [selected, setSelected] = useState(false);
	const { text = 'Default', path = '/', children, location, history } = props;

	useEffect(() => {
		if (location.pathname.split('/')[1] === path.split('/')[1])
			setSelected(true);
		else setSelected(false);
	}, [location, path]);

	return (
		<div>
			<ListItem
				button
				key={text}
				selected={selected}
				onClick={e => history.push(path)}
			>
				<ListItemIcon>{children}</ListItemIcon>
				<ListItemText primary={text} />
			</ListItem>
		</div>
	);
}

export default withRouter(MenuItem);
