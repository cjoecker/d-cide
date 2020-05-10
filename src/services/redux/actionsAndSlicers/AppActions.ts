import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {HTTP_ERROR} from '../../../constants/Alerts';
import AppSlice from './AppSlice';

// eslint-disable-next-line import/prefer-default-export
export const showHTTPAlert = (dispatch: Dispatch, error: AxiosError) => {
	const httpError = {
		...HTTP_ERROR,
		text: `${error.response?.statusText} (${error.response?.status})`,
	};
	dispatch(AppSlice.actions.addAlert(httpError));
};
