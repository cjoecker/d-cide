import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { axiosRequest, ErrorActionType } from "./axiosRequest";
import axios, { AxiosError, AxiosPromise } from "axios";
import DecisionsSlice from "./Decisions_Reducer";
import { AppDispatch, AppThunk } from "./store";
import AppSlice, { showHTTPAlert } from "./AppSlice";
import { Dispatch } from "react";

type SessionState = {
	signUpSuccessful: boolean;
	wrongPassword: boolean;
	token: string;
	user: User;
};

type User = {
	registeredUser: boolean;
	fullName: string;
	id: number;
	exp: number;
	iat: number;
	username: string;
};

let initialState: SessionState = {
	signUpSuccessful: false,
	wrongPassword: false,
	token: "",
	user: {
		registeredUser: false,
		fullName: "",
		id: 0,
		exp: 0,
		iat: 0,
		username: "",
	},
};

const SessionSlice = createSlice({
	name: "Session",
	initialState: initialState,
	reducers: {
		setSession(state, action: PayloadAction<LoginResponse>) {
			state.token = action.payload.token;
			state.user = jwt_decode(action.payload.token);
			state.wrongPassword = false;
		},
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},
		setSignUpSuccessful(state, action: PayloadAction<boolean>) {
			state.signUpSuccessful = action.payload;
		},
		setWrongPassword(state, action: PayloadAction<boolean>) {
			state.wrongPassword = action.payload;
		},
	},
});

export default SessionSlice;

export interface LoginRequest {
	username: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	token: string;
}

export const postSession = (
	dispatch: AppDispatch,
	loginRequest: LoginRequest
) => {
	dispatch(
		axiosRequest(
			axios.post<LoginResponse>("/api/sessions/", loginRequest),
			SessionSlice.actions.setSession.bind(null),
			resetWrongPasswordAnimation.bind(null)
		)
	);
};

const resetWrongPasswordAnimation: ErrorActionType = (dispatch, error) => {
	if (error.response?.data.password !== undefined) {
		dispatch(SessionSlice.actions.setWrongPassword(false));
		dispatch(SessionSlice.actions.setWrongPassword(true));
	} else {
		showHTTPAlert(dispatch, error);
	}
};

export const createUnregisteredUser = (
	dispatch: AppDispatch
) => {
	dispatch(
		axiosRequest(
			axios.post<LoginResponse>("/api/sessions/unregistered"),
			SessionSlice.actions.setSession.bind(null)
		)
	);
};
