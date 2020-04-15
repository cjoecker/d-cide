import axios, { AxiosResponse } from "axios";
import store, { AppDispatch } from "../store";
import {
	AxiosRequest,
	ErrorActionType,
	SuccessExtraActionType,
} from "../AxiosRequest";
import SessionSlice, { SignUpRequest, User } from "./SessionSlice";
import { showHTTPAlert } from "./AppActions";
import jwt_decode from "jwt-decode";
import DecisionsSlice from "./DecisionsSlice";
import OptionsAndCriteriaSlice from "./OptionsAndCriteriaSlice";
import RatedOptionsSlice from "./RatedOptionsSlice";
import WeightedCriteriaSlice from "./WeightCriteriaSlice";

export interface LoginRequest {
	username: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	token: string;
}

export const login = (dispatch: AppDispatch, loginRequest: LoginRequest) => {
	dispatch(
		AxiosRequest(
			axios.post<LoginResponse>("/api/sessions/", loginRequest),
			SessionSlice.actions.setSession.bind(null),
			null,
			resetWrongPasswordAnimation.bind(null)
		)
	);
};

export const logout = (dispatch: AppDispatch) => {
	dispatch(DecisionsSlice.actions.setDecisions([]));
	dispatch(OptionsAndCriteriaSlice.actions.setDecisionOptions([]));
	dispatch(OptionsAndCriteriaSlice.actions.setSelectionCriteria([]));
	dispatch(RatedOptionsSlice.actions.setRatedOptions([]));
	dispatch(SessionSlice.actions.deleteSession());
	dispatch(WeightedCriteriaSlice.actions.setWeightedCriteria([]));
	deleteTokenCookie();
};

export const createUnregisteredUser = (dispatch: AppDispatch) => {
	dispatch(
		AxiosRequest(
			axios.post<LoginResponse>("/api/sessions/unregistered"),
			SessionSlice.actions.setSession.bind(null),
			saveCookieAfterLogin.bind(null),
			null
		)
	);
};

export const signUp = (dispatch: AppDispatch, newUser: SignUpRequest) => {
	dispatch(
		AxiosRequest(
			axios.post<SignUpResponse>("/api/users/", newUser),
			SessionSlice.actions.setSignUpSuccessful.bind(null),
			null,
			null,
			true
		)
	);
};

export interface SignUpResponse {
	id: number;
	username: string;
	fullName: string;
}

export const saveTokenCookie = (token: string) => {
	localStorage.setItem("token", token);
	axios.defaults.headers.common.Authorization = token;
};
const deleteTokenCookie = () => {
	localStorage.removeItem("token");
	delete axios.defaults.headers.common.Authorization;
};

const saveCookieAfterLogin: SuccessExtraActionType = (
	dispatch,
	answer: AxiosResponse<LoginResponse>
) => {
	saveTokenCookie(answer.data.token);
};

const resetWrongPasswordAnimation: ErrorActionType = (dispatch, error) => {
	if (error.response?.data.password != null) {
		dispatch(SessionSlice.actions.setWrongPassword(false));
		dispatch(SessionSlice.actions.setWrongPassword(true));
	} else {
		showHTTPAlert(dispatch, error);
	}
};

export const verifyToken = (token: string) => {
	if (token === "" || token === undefined) return;

	const decodedToken: User = jwt_decode(token);
	const currentTime = Date.now() / 1000;

	if (decodedToken.exp < currentTime) {
		logout(store.dispatch);
	} else {
		const tokenResponse: LoginResponse = {
			success: true,
			token,
		};

		store.dispatch(SessionSlice.actions.setSession(tokenResponse));
		saveTokenCookie(token);
	}
};
