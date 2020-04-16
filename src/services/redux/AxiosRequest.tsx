import { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "./store";
import AppSlice from "./actionsAndSlicers/AppSlice";
import { showHTTPAlert } from "./actionsAndSlicers/AppActions";

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
	successExtraAction: SuccessExtraActionType = null,
	errorAction: ErrorActionType = null,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	predefinedPayload: any = null
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
): AppThunk => async (dispatch) => {
	await dispatch(AppSlice.actions.startLoading());

	axiosPromise
		.then((answer) => {

			if (predefinedPayload == null)
				dispatch(successAction(answer.data));
			else
				dispatch(successAction(predefinedPayload));

			if (successExtraAction != null)
				successExtraAction(dispatch, answer);
		})
		.catch((error: AxiosError) => {
			if (errorAction != null)
				errorAction(dispatch, error);
			else
				showHTTPAlert(dispatch, error);
		})
		.finally(() => {
			dispatch(AppSlice.actions.endLoading());
		});
};

export default AxiosRequest;
