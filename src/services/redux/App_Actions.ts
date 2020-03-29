import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {HTTP_ERROR} from "../Alerts";

export enum AppActionTypes {
	startLoading = "startLoading",
	endLoading = "endLoading",
	addAlerts = "addAlerts",
	deleteAlerts = "deleteAlerts",
}

export function showHTTPAlert(dispatch: Dispatch, error: AxiosError) {

	const httpError = {
		...HTTP_ERROR,
		text: `${error.response?.statusText} (${error.response?.status})`
	};

	dispatch({
		type: AppActionTypes.addAlerts,
		payload: [httpError]
	});
}