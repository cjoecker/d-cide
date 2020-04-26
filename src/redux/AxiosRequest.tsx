import { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "./store";
import AppSlice from "./actionsAndSlicers/AppSlice";
import { showHTTPAlert } from "./actionsAndSlicers/AppActions";

export interface SuccessExtraActionType {
	(dispatch: AppDispatch, answer: AxiosResponse): void;
}

export type ErrorActionType = {
	(dispatch: AppDispatch, error: AxiosError, predefinedPayload?: any): void;
};

export const AxiosRequest = (
	axiosPromise: AxiosPromise,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	successAction: ActionCreatorWithPayload<any>,
	successExtraAction: SuccessExtraActionType | null = null,
	errorAction: ErrorActionType | null = null,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	predefinedPayload: any = null
): AppThunk => async dispatch => {
	await dispatch(AppSlice.actions.startLoading());

	axiosPromise
		.then(answer => {
			if (predefinedPayload == null) dispatch(successAction(answer.data));
			else dispatch(successAction(predefinedPayload));

			if (successExtraAction != null) successExtraAction(dispatch, answer);
		})
		.catch((error: AxiosError) => {
			if (errorAction != null) errorAction(dispatch, error, predefinedPayload);
			else showHTTPAlert(dispatch, error);
		})
		.finally(() => {
			dispatch(AppSlice.actions.endLoading());
		});
};

export default AxiosRequest;
