import axios, {AxiosError} from "axios";
import {Action, Dispatch} from "redux";
import {SessionState, User} from "./Session_Reducer";
import jwt_decode from "jwt-decode";
import {ThunkAction} from "redux-thunk";
import {AppActionTypes, showHTTPAlert} from "./App_Actions";


export enum SessionActionTypes {
    setSession = "setSession",
    setSignUpSuccessful = "setSignUpSuccessful",
    setToken = "setToken",
    setWrongPassword = "setWrongPassword",
}


export interface LoginRequest {
    username: string;
    password: string;
}


export const postSession = (loginRequest: LoginRequest): ThunkAction<void, SessionState, null, Action<string>> => async dispatch => {

    await dispatch({
        type: AppActionTypes.startLoading
    });

    axios.post("/api/sessions/", loginRequest)
        .then((answer) => {
            dispatch({
                type: SessionActionTypes.setSession,
                payload: {
                	user: jwt_decode(answer.data.token),
					token: answer.data.token
                }
            });
        })
        .catch((error: AxiosError) => {
			if (error.response?.data.password !== undefined) {
                resetWrongPasswordAnimation(dispatch);
			} else {
				showHTTPAlert(dispatch, error);
			}
        }).finally(() => {
        dispatch({
            type: AppActionTypes.endLoading
        });
    })
};

const resetWrongPasswordAnimation = (dispatch: Dispatch) =>
{
    dispatch({
        type: SessionActionTypes.setSession,
        payload: {
            wrongPassword: false,
        }
    });
    dispatch({
        type: SessionActionTypes.setSession,
        payload: {
            wrongPassword: true,
        }
    });
};

export const getUnregisteredUser = (): ThunkAction<void, SessionState, null, Action<string>> => async dispatch => {

    await dispatch({
        type: AppActionTypes.startLoading
    });

    axios.post("/api/sessions/unregistered")
        .then((answer) => {
            dispatch({
                type: SessionActionTypes.setSession,
                payload: {
                    user: jwt_decode(answer.data.token),
                    token: answer.data.token
                }
            });
        })
        .catch((error: AxiosError) => {
            showHTTPAlert(dispatch, error);
        }).finally(() => {
        dispatch({
            type: AppActionTypes.endLoading
        });
    })
};



export function postUser(newUser: User) {
    // return async (dispatch: Dispatch<AppActions>) => {
    // 	dispatch(startLoading());
    //
    // 	await axios
    // 		.post("/api/users/", newUser)
    // 		.then((answer) => dispatch(setSignUpSuccessful(true)))
    // 		.catch((error: AxiosError) => {
    // 			dispatch(setSignUpSuccessful(false));
    // 			showHTTPAlert(error);
    // 		});
    //
    // 	dispatch(endLoading());
    // };
}

export function logout2() {

    // return async (dispatch: Dispatch<AppActions>) => {
    // 	dispatch(startLoading());
    //
    // 	dispatch(setSession(new User(), ""));
    //
    // 	dispatch(endLoading());
    // };
}

export const logout = () => {
    // async (dispatch: Dispatch<AppActions>) => {
    // dispatch(startLoading());
};




export function setJWT(token: string) {
    // return async (dispatch: Dispatch<AppActions>) => {
    // 	if (token) {
    // 		localStorage.setItem("token", token);
    // 		axios.defaults.headers.common["Authorization"] = token;
    // 	} else {
    // 		localStorage.removeItem("token");
    // 		delete axios.defaults.headers.common["Authorization"];
    // 		dispatch(setToken(""));
    // 	}
    // };
}
