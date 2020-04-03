import { AppThunk } from "./store";
import AppSlice, { showHTTPAlert } from "./AppSlice";
import axios, { AxiosError, AxiosPromise } from "axios";
import DecisionsSlice from "./Decisions_Reducer";

export const axiosRequest = (
	axiosPromise: AxiosPromise,
	successAction
): AppThunk => async (dispatch) => {
	await dispatch(AppSlice.actions.startLoading());

	axiosPromise
		.then((answer) => {
			dispatch(successAction(answer));
		})
		.catch((error: AxiosError) => {
			showHTTPAlert(dispatch, error);
		})
		.finally(() => {
			dispatch(AppSlice.actions.endLoading());
		});
};
