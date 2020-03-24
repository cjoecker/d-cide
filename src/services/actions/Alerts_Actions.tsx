import { Alert } from "../reducers/Alerts_Reducer";
import { Dispatch } from "redux";
import { AppActions } from "../reducers";
import { HTTP_ERROR } from "../Alerts";
import axios, { AxiosError } from "axios";
import { User } from "../reducers/Sessions_Reducer";
import { setUser } from "./Sessions_Actions";

export type AlertsActionsTypes =
	| ReturnType<typeof showAlert>
	| ReturnType<typeof deleteAlert>;

export const showAlert = (alert: Alert) =>
	({
		type: "SHOW_ALERT",
		alert,
	} as const);

export const deleteAlert = (alert: Alert) =>
	({
		type: "DELETE_ALERT",
		alert,
	} as const);

export function showHTTPAlert(error: AxiosError) {
	return async (dispatch: Dispatch<AppActions>) => {
		let httpError = HTTP_ERROR;

		httpError.text = `${error.response?.statusText} (${error.response?.status})`;

		dispatch(showAlert(httpError));
	};
}
