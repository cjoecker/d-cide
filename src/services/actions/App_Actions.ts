import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {AppState} from "../reducers/App_Reducer";


export enum AppActionsTypes {
	StartLoading = "StartLoading",
	EndLoading = "EndLoading",
}

export const startLoadingAction = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {

	dispatch({
		type: AppActionsTypes.StartLoading
	});

	setTimeout(() => {
		dispatch({
			type: AppActionsTypes.EndLoading
		});
	}, 2000);
};