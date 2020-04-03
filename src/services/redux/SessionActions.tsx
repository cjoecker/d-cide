import {AppDispatch} from "./store";
import {axiosRequest, ErrorActionType, SuccessExtraActionType} from "./axiosRequest";
import axios, {AxiosResponse} from "axios";
import {showHTTPAlert} from "./AppSlice";
import SessionSlice from "./SessionSlice";

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
        axiosRequest(
            axios.post<LoginResponse>("/api/sessions/", loginRequest),
            SessionSlice.actions.setSession.bind(null),
            loginSuccessful.bind(null),
            resetWrongPasswordAnimation.bind(null),
        )
    );
};

const loginSuccessful:SuccessExtraActionType = (dispatch, answer:AxiosResponse<LoginResponse>) => {
    localStorage.setItem("token", answer.data.token);
    axios.defaults.headers.common["Authorization"] = answer.data.token;
};

const resetWrongPasswordAnimation: ErrorActionType = (dispatch, error) => {
    if (error.response?.data.password !== undefined) {
        dispatch(SessionSlice.actions.setWrongPassword(false));
        dispatch(SessionSlice.actions.setWrongPassword(true));
    } else {
        showHTTPAlert(dispatch, error);
    }
};

export const logout = (dispatch: AppDispatch) => {
    dispatch(SessionSlice.actions.deleteSession);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
};

export const createUnregisteredUser = (dispatch: AppDispatch) => {
    dispatch(
        axiosRequest(
            axios.post<LoginResponse>("/api/sessions/unregistered"),
            SessionSlice.actions.setSession.bind(null),
            loginSuccessful.bind(null),
            null,

        )
    );
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

//TODO: needs to be tested
export const signUp = (dispatch: AppDispatch, newUser: SignUpRequest) => {
    dispatch(
        axiosRequest(
            axios.post<SignUpResponse>("/api/users/", newUser),
            SessionSlice.actions.setSignUpSuccessful.bind(null)
        )
    );
};