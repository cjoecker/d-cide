import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {AppState} from "../reducers/App_Reducer";

export type AppActionsTypes =
	| ReturnType<typeof startLoading>
	| ReturnType<typeof endLoading>;


export const startLoading = () =>
	({
		type: "START_LOADING",
	} as const);

export const endLoading = () =>
	({
		type: "END_LOADING",
	} as const);



export const startLoadingAction = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
	dispatch(startLoading());

	setTimeout(() => {
		dispatch(endLoading());
	}, 5000);
};