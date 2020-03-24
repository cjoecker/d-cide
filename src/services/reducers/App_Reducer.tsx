import { AppActionsTypes } from "../actions/App_Actions";
import {Alert} from "./Alerts_Reducer";

export class App {
	isLoading: number = 0;
}

export const InitialState: App = new App();

export default function (state = InitialState, action: AppActionsTypes): App {
	switch (action.type) {
		case "START_LOADING":
			return {
				...state,
				isLoading: state.isLoading + 1,
			};

		case "END_LOADING":
			return {
				...state,
				isLoading: state.isLoading - 1,
			};

		default:
			return state;
	}
}
