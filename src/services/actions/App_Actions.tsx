import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {AppState} from "../reducers/App_Reducer";

export type AppActionsTypes2 =
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


export enum AppActionsTypes {
	StartLoading = "StartLoading",
	EndLoading = "EndLoading",
}

export const startLoadingAction = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {

	dispatch({type: AppActionsTypes.StartLoading, payload: {}});
	// dispatch(endLoading2("START_LOADING"));

	setTimeout(() => {
		dispatch({type: AppActionsTypes.EndLoading, payload: {}});
		// dispatch(endLoading2("END_LOADING"));
	}, 2000);
};