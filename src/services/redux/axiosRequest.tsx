import { AppDispatch, AppThunk } from "./store";
import AppSlice, { showHTTPAlert } from "./AppSlice";
import axios, { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

export interface SuccessActionType {
	(answer: PayloadAction<any>);
}

export interface SuccessExtraActionType {
	(dispatch: AppDispatch, answer: AxiosResponse<any>);
}

export interface ErrorActionType {
	(dispatch: AppDispatch, error: AxiosError);
}

export const axiosRequest = (
	axiosPromise: AxiosPromise,
	successAction: SuccessActionType,
	successExtraAction?: SuccessExtraActionType,
	errorAction?: ErrorActionType
): AppThunk => async (dispatch) => {
	await dispatch(AppSlice.actions.startLoading());

	axiosPromise
		.then((answer) => {
			dispatch(successAction(answer.data));
			if (successExtraAction != undefined) successExtraAction(dispatch, answer);
		})
		.catch((error: AxiosError) => {
			errorAction != undefined
				? errorAction(dispatch, error)
				: showHTTPAlert(dispatch, error);
		})
		.finally(() => {
			dispatch(AppSlice.actions.endLoading());
		});
};
