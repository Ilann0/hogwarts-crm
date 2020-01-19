import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { setServerMsg } from '../redux/actions/globalActions';
import { useDispatch, useSelector } from 'react-redux';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function Message(props) {
	const dispatch = useDispatch();
	const state = useSelector(state => state.global);

	const handleClose = () => {
		dispatch(setServerMsg(''));
	};

	const { msg, fetchingError } = state;
	return (
		<Snackbar open={!!msg} autoHideDuration={6000} onClose={handleClose}>
			<Alert
				onClose={handleClose}
				severity={fetchingError ? 'error' : 'info'}
			>
				{msg}
			</Alert>
		</Snackbar>
	);
}
