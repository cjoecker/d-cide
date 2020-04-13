import axios, { AxiosResponse } from "axios";
import store, { AppDispatch } from "../store";
import {
	AxiosRequest,
	ErrorActionType,
	SuccessExtraActionType,
} from "../AxiosRequest";
import SessionSlice, { User } from "./SessionSlice";
import { showHTTPAlert } from "./AppActions";
import jwt_decode from "jwt-decode";

export interface LoginRequest {
	username: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	token: string;
}

export const login = (
	dispatch: AppDispatch,
	loginRequest: LoginRequest
) => {
	dispatch(
		AxiosRequest(
			axios.post<LoginResponse>("/api/sessions/", loginRequest),
			SessionSlice.actions.setUser.bind(null),
			null,
			resetWrongPasswordAnimation.bind(null)
		)
	);
};

export const logout = (dispatch: AppDispatch) => {
	dispatch(SessionSlice.actions.deleteUser);
	deleteToken(dispatch);
};

export const createUnregisteredUser = (dispatch: AppDispatch) => {
	dispatch(
		AxiosRequest(
			axios.post<LoginResponse>("/api/sessions/unregistered"),
			SessionSlice.actions.setUser.bind(null),
			saveUnregisteredToken.bind(null),
			null
		)
	);
};

// TODO: needs to be tested
export const signUp = (dispatch: AppDispatch, newUser: SignUpRequest) => {
	dispatch(
		AxiosRequest(
			axios.post<SignUpResponse>("/api/users/", newUser),
			SessionSlice.actions.setSignUpSuccessful.bind(null)
		)
	);
};


const saveUnregisteredToken: SuccessExtraActionType = (
	dispatch,
	answer: AxiosResponse<LoginResponse>
) => {
	saveToken(dispatch, answer.data.token);
};

const saveToken = (dispatch: AppDispatch, token: string) => {
	localStorage.setItem("token", token);
	axios.defaults.headers.common.Authorization = token;
	dispatch(SessionSlice.actions.setToken(token));
};
const deleteToken = (dispatch: AppDispatch) => {
	localStorage.removeItem("token");
	delete axios.defaults.headers.common.Authorization;
	dispatch(SessionSlice.actions.deleteToken());
};

const resetWrongPasswordAnimation: ErrorActionType = (dispatch, error) => {
	if (error.response?.data.password != null) {
		dispatch(SessionSlice.actions.setWrongPassword(false));
		dispatch(SessionSlice.actions.setWrongPassword(true));
	} else {
		showHTTPAlert(dispatch, error);
	}
};



export interface SignUpRequest {
	username: string;
	fullName: string;
	registeredUser: boolean;
	password: string;
	confirmPassword: string;
}

export interface SignUpResponse {
	id: number;
	username: string;
	fullName: string;
}




export const verifyToken = (token: string) => {
	if (token === "" || token === undefined) return;

	const decodedToken: User = jwt_decode(token);
	const currentTime = Date.now() / 1000;

	if (decodedToken.exp < currentTime) {
		logout(store.dispatch);
	}
	// else {
	// 	const tokenResponse: LoginResponse = {
	// 		success: true,
	// 		token,
	// 	};
	//
	// 	SessionSlice.actions.setUser(tokenResponse);
	// 	SessionSlice.actions.setUser(tokenResponse);
	// 	saveToken(token);
	// }
};
