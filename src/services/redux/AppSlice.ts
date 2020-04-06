import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType } from "../Alerts";

type AppState = {
	isLoading: number;
	alerts: AlertType[];
};

const initialState: AppState = {
	isLoading: 0,
	alerts: [],
};

const AppSlice = createSlice({
	name: "App",
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading += 1;
		},
		endLoading(state) {
			state.isLoading -= 1;
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

