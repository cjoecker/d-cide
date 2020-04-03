import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

//TODO set token expiration date
type SessionState = {
	signUpSuccessful: boolean;
	wrongPassword: boolean;
	token: string;
	tokenExpirationDate: number;
	user: User;
};

type User = {
	id: number;
	username: string;
	registeredUser: boolean;
	fullName: string;
};

let initialState: SessionState = {
	signUpSuccessful: false,
	wrongPassword: false,
	token: "",
	tokenExpirationDate: 0,
	user: {
		id: 0,
		username: "",
		registeredUser: false,
		fullName: "",
	},
};

const SessionSlice = createSlice({
	name: "Session",
	initialState: initialState,
	reducers: {
		setSession(state, action: PayloadAction<string>) {
			state.token = action.payload;
			state.user = jwt_decode(action.payload);
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