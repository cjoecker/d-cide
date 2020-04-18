import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// eslint-disable-next-line @typescript-eslint/camelcase
import jwt_decode from "jwt-decode";
import { LoginResponse } from "./SessionActions";

type SessionState = {
	signUpSuccessful: boolean;
	wrongPassword: boolean;
	token: string;
	user: User;
	signUpErrors: SignUpRequest;
};

export type User = {
	registeredUser: boolean;
	fullName: string;
	id: number;
	exp: number;
	iat: number;
	username: string;
};

export type SignUpRequest = {
	username: string;
	fullName: string;
	password: string;
	confirmPassword: string;
};

export const initialState: SessionState = {
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
	signUpErrors: {
		username: "",
		fullName: "",
		password: "",
		confirmPassword: "",
	},
};

const SessionSlice = createSlice({
	name: "Session",
	initialState,
	reducers: {
		setSession(state, action: PayloadAction<LoginResponse>) {
			state.token = action.payload.token;
			state.user = jwt_decode(action.payload.token);
			state.wrongPassword = false;
		},
		deleteSession(state) {
			state.token = "";
			state.user = initialState.user;
			state.wrongPassword = false;
		},
	},
});

export default SessionSlice;
