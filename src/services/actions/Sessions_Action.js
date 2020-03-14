import axios from "axios";
import {
    SHOW_MESSAGE,
    POST_SESSION,
    SAVE_JWT,
    DELETE_JWT, POST_USER, START_LOADING, END_LOADING,
} from "./types";
import {httpRequest} from "./HttpDispatcher";
import jwt_decode from "jwt-decode";


export const postUser = (newUser) => async dispatch => {

    dispatch(httpRequest(axios.post("/api/users/", newUser), SHOW_MESSAGE));

};

export const postSession = LoginRequest => async dispatch => {

    dispatch(httpRequest(axios.post("/api/sessions/", LoginRequest), SAVE_JWT));

};

export const get_unregisteredUser = () => async dispatch => {

    dispatch(httpRequest(axios.post("/api/sessions/", LoginRequest), SAVE_JWT));


    //Show Loading Bar
    dispatch({type: START_LOADING});

    try {
        const res = await axios.post("/api/sessions/unregistered");

        dispatch({
            type: POST_SESSION,
            payload: jwt_decode(res.data.token),
        });

        dispatch(setJWT(res.data.token));

    } catch (err) {
        dispatch({
            type: SHOW_MESSAGE,
            payload: err.response.data
        });
    }

    //Show Loading Bar
    dispatch({type: END_LOADING});

};


export const logout = () => dispatch => {

    dispatch(setJWT(false));

    dispatch({
        type: POST_SESSION,
        payload: null
    });
};

export const setJWT = token => async dispatch => {

    //Set Jwt in cookie
    if (token) {
        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        localStorage.removeItem("jwtToken");
        delete axios.defaults.headers.common["Authorization"];

        //delete jwt from redux
        dispatch({type: DELETE_JWT});
    }

};

