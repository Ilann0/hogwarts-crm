import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

function MenuItem(props) {
	const {
		text = 'Default',
		path = '/',
		selected = false,
		parentSetSelect = () => {},
		children,
	} = props;
	return (
		<div>
			<Link
				exact
				to={path}
				style={{ textDecoration: 'none' }}
				onClick={parentSetSelect}
				activeClassName={text}
			>
				<ListItem button key={text} selected={selected}>
					<ListItemIcon>{children}</ListItemIcon>
					<ListItemText primary={text} />
				</ListItem>
			</Link>
		</div>
	);
}

export default MenuItem;
