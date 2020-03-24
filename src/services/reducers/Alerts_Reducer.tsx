import { AlertsActionsTypes } from "../actions/Alerts_Actions";

export class Alert {
	type: AlertTypes = AlertTypes.error;
	allowDelete: boolean = false;
	autoHide: boolean = false;
	text: string = "";
}

export enum AlertTypes {
	error,
	warning,
	info,
	success,
}

const initialState: Alert[] = [];

export default function (
	state = initialState,
	action: AlertsActionsTypes
): Alert[] {
	switch (action.type) {
		case "SHOW_ALERT":
			return state.some((alert) => alert === action.alert)
				? state
				: [action.alert, ...state];

		case "DELETE_ALERT":
			return state.filter((alert) => alert !== action.alert);

		default:
			return state;
	}
}
