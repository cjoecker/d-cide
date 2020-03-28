import axios, { AxiosError } from "axios";
import {Action, Dispatch} from "redux";
import { User } from "../reducers/Sessions_Reducer";
import { showHTTPAlert } from "./Alerts_Actions";
import {endLoading, endLoading2, startLoading} from "./App_Actions";
import jwt_decode from "jwt-decode";
import {AppActions} from "../store";
import {httpRequest} from "../HttpDispatcher";
import {PUT_DECISION} from "./types";
import {ThunkAction} from "redux-thunk";
import {AppState} from "../reducers/App_Reducer";

export type SessionsActionsTypes =
	| ReturnType<typeof setSession>
	| ReturnType<typeof setSignUpSuccessful>
	| ReturnType<typeof setToken>
	| ReturnType<typeof setWrongPassword>;

export const setSession = (user: User, token: string) =>
	({
		type: "SET_SESSION",
		user,
		token,
	} as const);

export const setSignUpSuccessful = (signUpSuccessful: boolean) =>
	({
		type: "POST_USER",
		signUpSuccessful,
	} as const);


export const setToken = (token: string) =>
	({
		type: "SET_TOKEN",
		token,
	} as const);

export const setWrongPassword = (wrongPassword: boolean) =>
	({
		type: "SET_WRONG_PASSWORD",
		wrongPassword,
	} as const);

export interface LoginRequest {
	username: string;
	password: string;
}


export const postSession = (loginRequest: LoginRequest): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
	dispatch(startLoading());

	await axios
		.post("/api/sessions/", loginRequest)
		.then((answer) => {
			dispatch(setSession(jwt_decode(answer.data.token), answer.data.token));
		})
		.catch((error: AxiosError) => {
			if (error.response?.data.password !== undefined) {
				//reset value for animation
				dispatch(setWrongPassword(false));
				dispatch(setWrongPassword(true));
			} else {
				showHTTPAlert(error);
			}
		});

	dispatch(endLoading());
};


export function postUser(newUser: User) {
	return async (dispatch: Dispatch<AppActions>) => {
		dispatch(startLoading());

		await axios
			.post("/api/users/", newUser)
			.then((answer) => dispatch(setSignUpSuccessful(true)))
			.catch((error: AxiosError) => {
				dispatch(setSignUpSuccessful(false));
				showHTTPAlert(error);
			});

		dispatch(endLoading());
	};
}

export function logout2() {
	console.log("hola");

	return async (dispatch: Dispatch<AppActions>) => {
		dispatch(startLoading());

		dispatch(setSession(new User(), ""));

		dispatch(endLoading());
	};
}

export const logout = () => async (dispatch: Dispatch<AppActions>) => {
	dispatch(startLoading());
};


export function getUnregisteredUser() {
	return async (dispatch: Dispatch<AppActions>) => {
		dispatch(startLoading());

		await axios
			.post("/api/sessions/unregistered")
			.then((answer) => {
				dispatch(setSession(jwt_decode(answer.data.token), answer.data.token));
			})
			.catch((error: AxiosError) => {
				showHTTPAlert(error);
			});

		dispatch(endLoading());
	};
}

export function setJWT(token: string) {
	return async (dispatch: Dispatch<AppActions>) => {
		if (token) {
			localStorage.setItem("token", token);
			axios.defaults.headers.common["Authorization"] = token;
		} else {
			localStorage.removeItem("token");
			delete axios.defaults.headers.common["Authorization"];
			dispatch(setToken(""));
		}
	};
}
