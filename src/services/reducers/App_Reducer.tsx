import { AppActionsTypes } from "../actions/App_Actions";

export class App {
	isLoading: number = 0;
}

export default function (state = new App(), action: AppActionsTypes): App {
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
