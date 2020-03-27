import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {AppState} from "../reducers/App_Reducer";

export type AppActionsTypes =
	| ReturnType<typeof startLoading>
	| ReturnType<typeof endLoading>;


export enum ActionType {
	StartLoading,
	EndLoading,
}

export const startLoading = () =>
	({
		type: ActionType.StartLoading,
	} as const);

export const endLoading = () =>
	({
		type: ActionType.EndLoading,
	} as const);


//
// export const startLoadingAction = (dispatch) => {
// 	dispatch(fetchExample());
// };

export const startLoadingAction = (): ThunkAction<void, AppState, null, Action<ActionType>> => async dispatch => {
	dispatch(startLoading());

	setTimeout(() => {
		dispatch(endLoading());
	}, 5000);
};