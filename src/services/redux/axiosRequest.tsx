import {AppDispatch, AppThunk} from "./store";
import AppSlice, { showHTTPAlert } from "./AppSlice";
import axios, {AxiosError, AxiosPromise, AxiosResponse} from "axios";
import {PayloadAction} from "@reduxjs/toolkit";


export interface SuccessActionType {
	(answer: PayloadAction<any>);
}

export interface ErrorActionType {
	(dispatch: AppDispatch, error: AxiosError);
}

export const axiosRequest = (
	axiosPromise: AxiosPromise,
	successAction: SuccessActionType,
	errorAction? : ErrorActionType
): AppThunk => async (dispatch) => {
	await dispatch(AppSlice.actions.startLoading());

	axiosPromise
		.then((answer) => {
			dispatch(successAction(answer.data));
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
