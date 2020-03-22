import axios from "axios";
import {
    END_LOADING,
    SHOW_ALERT,
    START_LOADING,
    POST_SESSION,
    POST_USER,
    SAVE_TOKEN,
    DELETE_TOKEN,
    SET_ERRORS,
} from "./types";
import {User} from "../types/Session";
import {AppActions} from "../types/actions";
import {Dispatch} from "redux";

export type SessionActionTypes =
    | ReturnType<typeof postSession>
    | ReturnType<typeof postUser>
    | ReturnType<typeof saveToken>
    | ReturnType<typeof deleteToken>;


export const postSession = (user: User) =>
    ({
        type: "POST_SESSION",
        user
    } as const);


export const postUser = (signUpSuccessful: boolean) =>
    ({
    type: "POST_USER",
    signUpSuccessful
} as const);

export const saveToken = (token: string) =>
    ({
        type: "SAVE_TOKEN",
        token
    } as const);

export const deleteToken = () =>
    ({
        type: "DELETE_TOKEN"
    } as const);



function startPostUser(newUser:User) {
    return async (dispatch: Dispatch<AppActions>) => {

        //Show Loading Bar
        dispatch({type: START_LOADING});

        let signUpSuccessful = false;

        try {
            await axios.post("/api/users/", newUser);
            dispatch({
                type: SHOW_ALERT,
                payload: {}
            });

            signUpSuccessful = true;

        } catch (err) {

            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        }

        //SignUp Successful
        dispatch(
            PostUserAction({
                type: POST_USER,
                signUpSuccessful: signUpSuccessful,
            })
        );

        dispatch(postUser(signUpSuccessful));

        //Show Loading Bar
        dispatch({type: END_LOADING});
    }
}
    //
    //
    // export const postSession = LoginRequest => async dispatch => {
    //
    //     //Show Loading Bar
    //     dispatch({type: START_LOADING});
    //
    //
    //     try {
    //         // post => Login Request
    //         const res = await axios.post("/api/sessions/", LoginRequest);
    //
    //         //save token in redux before saving user
    //         await dispatch({
    //             type: SAVE_TOKEN,
    //             payload: res.data.token,
    //         });
    //
    //         //set new user
    //         dispatch({
    //             type: POST_SESSION,
    //             payload: token_decode(res.data.token),
    //         });
    //     } catch (err) {
    //
    //         if (err.response.data.password !== undefined) {
    //             await dispatch({
    //                 type: SET_ERRORS,
    //                 payload: null,
    //             });
    //
    //             dispatch({
    //                 type: SET_ERRORS,
    //                 payload: err.response.data,
    //             });
    //         } else {
    //             dispatch({
    //                 type: SHOW_ALERT,
    //                 payload: err.response.data
    //             });
    //         }
    //     }
    //
    //     //Show Loading Bar
    //     dispatch({type: END_LOADING});
    // };
    //
    //
    // export const logout = () => async dispatch => {
    //
    //     await dispatch(setJWT(false));
    //
    //     dispatch({
    //         type: POST_SESSION,
    //         payload: null
    //     });
    // };
    //
    // export const get_unregisteredUser = () => async dispatch => {
    //
    //     //Show Loading Bar
    //     dispatch({type: START_LOADING});
    //
    //     try {
    //         const res = await axios.post("/api/sessions/unregistered");
    //
    //         await dispatch(setJWT(res.data.token));
    //
    //         dispatch({
    //             type: POST_SESSION,
    //             payload: token_decode(res.data.token),
    //         });
    //
    //     } catch (err) {
    //         dispatch({
    //             type: SHOW_ALERT,
    //             payload: err.response.data
    //         });
    //     }
    //
    //     //Show Loading Bar
    //     dispatch({type: END_LOADING});
    //
    // };
    //
    // export const setJWT = token => async dispatch => {
    //
    //     //Set Jwt in cookie
    //     if (token) {
    //         // store the token in the localStorage
    //         localStorage.setItem("token", token);
    //         axios.defaults.headers.common["Authorization"] = token;
    //     } else {
    //         localStorage.removeItem("token");
    //         delete axios.defaults.headers.common["Authorization"];
    //
    //         //delete token from redux
    //         dispatch({type: DELETE_TOKEN});
    //     }
    //
    // };
    //
