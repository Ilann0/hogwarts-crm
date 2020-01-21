import { serverErrorMsg } from './errorMessage';
import {
	setFetchingError,
	setServerMsg,
	toggleLoading,
	resetGlobalState,
} from './globalActions';

export const commonServerAction = (data, func) => dispatch => {
	dispatch(resetGlobalState());
	dispatch(toggleLoading());
	func(data)
		.then(res => {
			dispatch(setServerMsg(res.data.message));
			dispatch(toggleLoading());
		})
		.catch(error => {
			dispatch(setFetchingError(serverErrorMsg));
		});
};
