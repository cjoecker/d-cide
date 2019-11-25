import axios from "axios";
import {
    END_LOADING,
    GET_ERRORS,
    START_LOADING,
    SET_CURRENT_USER,
    GET_UNREGISTERED_USERS,
    SIGNUP_SUCCESSFUL,
    START_FETCHING_DATA_PACKAGE,
    END_FETCHING_DATA_PACKAGE,
} from "./types";
import setJWTToken from "../securityUtils";
import jwt_decode from "jwt-decode";


export const signUp = (newUser, history) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    let signUpSuccessful = false;

    try {
        await axios.post("/api/users/signUp", newUser);
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
        const res = await axios.post("/api/users/login", LoginRequest);

        // extract token from res.data
        const {token} = res.data;

        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);

        // set our token in header ***
        setJWTToken(token);

        // decode token on React
        const decoded = jwt_decode(token);

        // dispatch to our securityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
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
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: null
    });
};

export const get_unregisteredUser = () => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    try {
        // post => Login Request
        const res = await axios.get("/api/users/unregistered");

        // extract token from res.data
        const {token} = res.data;

        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);

        // set our token in header ***
        setJWTToken(token);

        // decode token on React
        const decoded = jwt_decode(token);

        // dispatch to our securityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
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
