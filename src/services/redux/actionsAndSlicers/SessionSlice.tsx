import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// eslint-disable-next-line @typescript-eslint/camelcase
import jwt_decode from "jwt-decode";
import { LoginResponse } from "./SessionActions";

type SessionState = {
	signUpSuccessful: boolean;
	wrongPassword: boolean;
	token: string;
	user: User;
};

export type User = {
	registeredUser: boolean;
	fullName: string;
	id: number;
	exp: number;
	iat: number;
	username: string;
};

const initialState: SessionState = {
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
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<LoginResponse>) {
			state.user = jwt_decode(action.payload.token);
			state.wrongPassword = false;
		},
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},
		deleteUser(state) {
			state.user = initialState.user;
			state.wrongPassword = false;
		},
		deleteToken(state) {
			state.token = initialState.token;
		},

		setSignUpSuccessful(state, action: PayloadAction<boolean>) {
			state.signUpSuccessful = !action.payload;
		},
		setWrongPassword(state, action: PayloadAction<boolean>) {
			state.wrongPassword = action.payload;
		},
	},
});

export default SessionSlice;
