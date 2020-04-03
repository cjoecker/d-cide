import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType, HTTP_ERROR } from "../Alerts";
import { Dispatch } from "redux";
import { AxiosError } from "axios";

type AppState = {
	isLoading: number;
	alerts: AlertType[];
};

let initialState: AppState = {
	isLoading: 0,
	alerts: [],
};

const AppSlice = createSlice({
	name: "App",
	initialState: initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = state.isLoading + 1;
		},
		endLoading(state) {
			state.isLoading = state.isLoading - 1;
		},
		addAlert(state, action: PayloadAction<AlertType>) {
			state.alerts = state.alerts.some(
				(alert) => JSON.stringify(alert) === JSON.stringify(action.payload)
			)
				? state.alerts
				: [action.payload, ...state.alerts];
		},
		deleteAlert(state, action: PayloadAction<AlertType>) {
			state.alerts = state.alerts.filter(
				(alert) => JSON.stringify(alert) !== JSON.stringify(action.payload)
			);
		},
	},
});

export default AppSlice;

export const showHTTPAlert = (dispatch: Dispatch, error: AxiosError) => {

	const httpError = {
		...HTTP_ERROR,
		text: `${error.response?.statusText} (${error.response?.status})`,
	};
	dispatch(AppSlice.actions.addAlert(httpError));
};
