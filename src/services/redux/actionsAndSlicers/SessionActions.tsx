import axios, { AxiosResponse } from "axios";
import store, { AppDispatch } from "../store";
import { AxiosRequest, SuccessExtraActionType } from "../AxiosRequest";
import SessionSlice, { User } from "./SessionSlice";
import jwt_decode from "jwt-decode";
import DecisionsSlice from "./DecisionsSlice";
import OptionsAndCriteriaSlice from "./OptionsAndCriteriaSlice";
import RatedOptionsSlice from "./RatedOptionsSlice";
import WeightedCriteriaSlice from "./WeightCriteriaSlice";

export type LoginResponse = {
	success: boolean;
	token: string;
};

export const createUnregisteredUser = (dispatch: AppDispatch) => {
	dispatch(
		AxiosRequest(
			axios.post<LoginResponse>('/api/sessions/unregistered'),
			SessionSlice.actions.setSession.bind(null),
			saveCookieAfterLogin.bind(null),
			null
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

export const saveTokenCookie = (token: string) => {
	localStorage.setItem('token', token);
	axios.defaults.headers.common.Authorization = token;
};
const deleteTokenCookie = () => {
	localStorage.removeItem('token');
	delete axios.defaults.headers.common.Authorization;
};

const saveCookieAfterLogin: SuccessExtraActionType = (dispatch, answer: AxiosResponse<LoginResponse>) => {
	saveTokenCookie(answer.data.token);
};

export const verifyToken = (token: string) => {
	if (token === '' || token === undefined) return;

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
