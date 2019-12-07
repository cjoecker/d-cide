import axios from "axios";
import {
    END_LOADING,
    GET_ERRORS,
    START_LOADING,
    SET_CURRENT_USER,
    SIGNUP_SUCCESSFUL,
    START_FETCHING_DATA_PACKAGE,
    END_FETCHING_DATA_PACKAGE,
} from "./types";
import setJWTToken, {setUser} from "../securityUtils";


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

        // dispatch to our securityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: setUser(res.data.token),
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
        const res = await axios.post("/api/sessions/unregistered");

        // dispatch to our securityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: setUser(res.data.token),
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

