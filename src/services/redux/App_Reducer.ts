import { Reducer } from "redux";
import { DispatchAction } from "./store";
import { AppActionTypes } from "./App_Actions";
import { AlertClass } from "../Alerts";
import {
	mergeWithoutDuplicates,
	removeObjectsFromArray,
} from "../GeneralUtils";

export class AppState {
	isLoading: number = 0;
	alerts: AlertClass[] = [];
}

export const App_Reducer: Reducer<AppState, DispatchAction> = (
	state = new AppState(),
	action
) => {
	switch (action.type) {
		case AppActionTypes.startLoading:
			return {
				...state,
				isLoading: state.isLoading + 1,
			};
		case AppActionTypes.endLoading:
			return {
				...state,
				isLoading: state.isLoading - 1,
			};
		case AppActionTypes.addAlerts:
			return {
				...state,
				Alerts: mergeWithoutDuplicates(state.alerts, [
					...(action.payload.alerts || []),
				]),
			};
		case AppActionTypes.deleteAlerts:
			return {
				...state,
				Alerts: removeObjectsFromArray(state.alerts, [
					...(action.payload.alerts || []),
				]),
			};
		default:
			return state;
	}
};
