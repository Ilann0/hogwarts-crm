import {
	setFetchingError,
	setServerMsg,
	toggleLoading,
	resetGlobalState,
} from './globalActions';
import { serverErrorMsg } from './errorMessage';

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
