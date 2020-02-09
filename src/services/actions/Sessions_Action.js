import axios from "axios";
import {
    END_LOADING,
    GET_ERRORS,
    START_LOADING,
    POST_SESSION,
    POST_USER,
    START_FETCHING_DATA_PACKAGE,
    END_FETCHING_DATA_PACKAGE,
    SAVE_JWT,
    DELETE_JWT,
} from "./types";
import jwt_decode from "jwt-decode";


export const postUser = (newUser, history) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    let signUpSuccessful = false;

    try {
        await axios.post("/api/users/", newUser);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

        signUpSuccessful = true;

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }

    //SignUp Successful
    dispatch({
        type: POST_USER,
        payload: signUpSuccessful
    });

    //Show Loading Bar
    dispatch({type: END_FETCHING_DATA_PACKAGE});
    dispatch({type: END_LOADING});
};

export const postSession = LoginRequest => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});


    try {
        // post => Login Request
        const res = await axios.post("/api/sessions/", LoginRequest);

        //save jwt in redux before saving it
        dispatch({
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
            type: GET_ERRORS,
            payload: err.response.data
        });
    }

    //Show Loading Bar
    dispatch({type: END_FETCHING_DATA_PACKAGE});
    dispatch({type: END_LOADING});
};



export const logout = () => dispatch => {

    dispatch(setJWT(false));

    dispatch({
        type: POST_SESSION,
        payload: null
    });
};

export const get_unregisteredUser = () => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    try {
        const res = await axios.post("/api/sessions/unregistered");

        dispatch({
            type: POST_SESSION,
            payload: jwt_decode(res.data.token),
        });

        dispatch(setJWT(res.data.token));

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }

    //Show Loading Bar
    dispatch({type: END_FETCHING_DATA_PACKAGE});
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

