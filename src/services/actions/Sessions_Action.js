import axios from "axios";
import {
    END_LOADING,
    SHOW_MESSAGE,
    START_LOADING,
    POST_SESSION,
    POST_USER,
    SAVE_JWT,
    DELETE_JWT,
} from "./types";
import jwt_decode from "jwt-decode";


export const postUser = (newUser, history) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    let signUpSuccessful = false;

    try {
        await axios.post("/api/users/", newUser);
        dispatch({
            type: SHOW_MESSAGE,
            payload: {}
        });

        signUpSuccessful = true;

    } catch (err) {
        dispatch({
            type: SHOW_MESSAGE,
            payload: err.response.data
        });
    }

    //SignUp Successful
    dispatch({
        type: POST_USER,
        payload: signUpSuccessful
    });

    //Show Loading Bar
    dispatch({type: END_LOADING});
};

export const postSession = LoginRequest => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});


    try {
        // post => Login Request
        const res = await axios.post("/api/sessions/", LoginRequest);

        //save jwt in redux before saving it
        await dispatch({
            type: SAVE_JWT,
            payload: res.data.token,
        });

        //set new user
        dispatch({
            type: POST_SESSION,
            payload: jwt_decode(res.data.token),
        });
    } catch (err) {
        dispatch({
            type: SHOW_MESSAGE,
            payload: err.response.data
        });
    }

    //Show Loading Bar
    dispatch({type: END_LOADING});
};



export const logout = () => async dispatch => {

    await dispatch(setJWT(false));

    dispatch({
        type: POST_SESSION,
        payload: null
    });
};

export const get_unregisteredUser = () => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    try {
        const res = await axios.post("/api/sessions/unregistered");

        await dispatch(setJWT(res.data.token));

        dispatch({
            type: POST_SESSION,
            payload: jwt_decode(res.data.token),
        });

    } catch (err) {
        dispatch({
            type: SHOW_MESSAGE,
            payload: err.response.data
        });
    }

    //Show Loading Bar
    dispatch({type: END_LOADING});

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

