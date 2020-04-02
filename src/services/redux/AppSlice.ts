// import { Reducer } from "redux";
// import { DispatchAction } from "./store";
// import { AppActionTypes } from "./App_Actions";
// import { AlertClass } from "../Alerts";
// import {
// 	mergeWithoutDuplicates,
// 	removeObjectsFromArray,
// } from "../GeneralUtils";
//
// export class AppState {
// 	isLoading: number = 0;
// 	alerts: AlertClass[] = [];
// }
//
// export const App_Reducer: Reducer<AppState, DispatchAction> = (
// 	state = new AppState(),
// 	action
// ) => {
// 	switch (action.type) {
// 		case AppActionTypes.startLoading:
// 			return {
// 				...state,
// 				isLoading: state.isLoading + 1,
// 			};
// 		case AppActionTypes.endLoading:
// 			return {
// 				...state,
// 				isLoading: state.isLoading - 1,
// 			};
// 		case AppActionTypes.addAlerts:
// 			return {
// 				...state,
// 				Alerts: mergeWithoutDuplicates(state.alerts, [
// 					...(action.payload.alerts || []),
// 				]),
// 			};
// 		case AppActionTypes.deleteAlerts:
// 			return {
// 				...state,
// 				Alerts: removeObjectsFromArray(state.alerts, [
// 					...(action.payload.alerts || []),
// 				]),
// 			};
// 		default:
// 			return state;
// 	}
// };

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType } from "../Alerts";

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
			state.alerts = state.alerts.some((alert) => JSON.stringify(alert) === JSON.stringify(action.payload))
				? state.alerts
				: [action.payload, ...state.alerts];
		},
		deleteAlert(state, action: PayloadAction<AlertType>) {
			state.alerts = state.alerts.filter(alert => JSON.stringify(alert) !== JSON.stringify(action.payload));
		},
	},
});



export default AppSlice;
