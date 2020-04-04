import { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "./store";
import AppSlice from "./AppSlice";
import { showHTTPAlert } from "./AppActions";

export interface SuccessActionType {
	(answer: PayloadAction<any>);
}

export interface SuccessExtraActionType {
	(dispatch: AppDispatch, answer: AxiosResponse);
}

export interface ErrorActionType {
	(dispatch: AppDispatch, error: AxiosError);
}


export const AxiosRequest = (
	axiosPromise: AxiosPromise,
	successAction: SuccessActionType,
	successExtraAction?: SuccessExtraActionType,
	errorAction?: ErrorActionType
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
): AppThunk => async (dispatch) => {
	await dispatch(AppSlice.actions.startLoading());

	axiosPromise
		.then((answer) => {
			dispatch(successAction(answer.data));
			if (successExtraAction !== undefined)
				successExtraAction(dispatch, answer);
		})
		.catch((error: AxiosError) => {
			if (errorAction !== undefined) errorAction(dispatch, error);
			else showHTTPAlert(dispatch, error);
		})
		.finally(() => {
			dispatch(AppSlice.actions.endLoading());
		});
};

export default AxiosRequest;
