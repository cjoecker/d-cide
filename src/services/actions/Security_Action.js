import axios from "axios";
import {
    END_LOADING,
    GET_ERRORS,
    START_LOADING,
    SET_USER,
    SIGNUP_SUCCESSFUL,
    START_FETCHING_DATA_PACKAGE,
    END_FETCHING_DATA_PACKAGE,
    SAVE_JWT,
    DELETE_JWT,
} from "./types";
import setJWTToken, {setJwt} from "../securityUtils";
import jwt_decode from "jwt-decode";


export const signUp = (newUser, history) => async dispatch => {

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
        type: SIGNUP_SUCCESSFUL,
        payload: signUpSuccessful
    });

    //Show Loading Bar
    dispatch({type: END_FETCHING_DATA_PACKAGE});
    dispatch({type: END_LOADING});
};

export const login = LoginRequest => async dispatch => {

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
            type: SET_USER,
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

export const set_user = (jwt) => dispatch => {

    //save jwt in cookie
    setJwt(jwt);

    //delete jwt from redux
    dispatch({type: DELETE_JWT});
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_USER,
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
            type: SET_USER,
            payload: jwt_decode(res.data.token),
        });

        setJwt(res.data.token);


    } catch (err) {

        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }

    //Show Loading Bar
    dispatch({type: END_FETCHING_DATA_PACKAGE});
    dispatch({type: END_LOADING});

};

