import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import {axiosRequest, ErrorActionType, SuccessExtraActionType} from "./axiosRequest";
import axios, {AxiosError, AxiosPromise, AxiosResponse} from "axios";
import DecisionsSlice from "./DecisionsSlice";
import { AppDispatch, AppThunk } from "./store";
import AppSlice, { showHTTPAlert } from "./AppSlice";
import { Dispatch } from "react";
import {LoginResponse} from "./SessionActions";

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
		deleteSession(state) {
			state.token = "";
			state.user = initialState.user;
			state.wrongPassword = false;
		},
		setToken(state, action: PayloadAction<string>) {
			//TODO: check if at the end of refactoring, this is necessary
			state.token = action.payload;
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


