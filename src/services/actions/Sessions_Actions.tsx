import axios from "axios";
import { Dispatch } from "redux";
import { User } from "../reducers/Sessions_Reducer";
import {AppActions} from "../reducers";

export type SessionsActionsTypes =
  | ReturnType<typeof setSession>
  | ReturnType<typeof setUser>
  | ReturnType<typeof saveToken>
  | ReturnType<typeof deleteToken>;

export const setSession = (user: User) =>
  ({
    type: "POST_SESSION",
    user,
  } as const);

export const setUser = (signUpSuccessful: boolean) =>
  ({
    type: "POST_USER",
    signUpSuccessful,
  } as const);

export const saveToken = (token: string) =>
  ({
    type: "SAVE_TOKEN",
    token,
  } as const);

export const deleteToken = () =>
  ({
    type: "DELETE_TOKEN",
  } as const);

function postUser(newUser: User) {
  return async (dispatch: Dispatch<AppActions>) => {
    //Show Loading Bar
    // dispatch({type: START_LOADING});
    //TODO

    let signUpSuccessful = false;

    try {
      await axios.post("/api/users/", newUser);
      // dispatch({
      //     type: SHOW_ALERT,
      //     payload: {}
      // });
      //TODO

      signUpSuccessful = true;
    } catch (err) {
      // dispatch({
      //     type: SET_ERRORS,
      //     payload: err.response.data
      // });
      //TODO
    }

    //SignUp Successful
    dispatch(setUser(signUpSuccessful));

    //Show Loading Bar
    // dispatch({type: END_LOADING});
    //TODO
  };
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
