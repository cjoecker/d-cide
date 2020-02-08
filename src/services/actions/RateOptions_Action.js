import axios from "axios";
import {
    START_LOADING,
    END_LOADING,
    GET_OPTIONS,
    GET_ERRORS,
    POST_OPTIONS,
    START_FETCHING_DATA_PACKAGE,
    END_FETCHING_DATA_PACKAGE,
} from "./types";


export const get_options = (decisionId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.get(`/api/decisions/${decisionId}/ratedOptions`);
        dispatch({
            type: GET_OPTIONS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: `${error.response.statusText} (${error.response.status})`
        });
    }

    //Show Loading Bar
    dispatch({type: END_LOADING});

};

export const send_every_option = (decisionId, options) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});
    //Get Information
    try {
        const res = await axios.put(`/api/decisions/${decisionId}/ratedOptions`, options);
        dispatch({
            type: POST_OPTIONS
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: `${error.response.statusText} (${error.response.status})`
        });
    }

    //Show Loading Bar
    dispatch({type: END_FETCHING_DATA_PACKAGE});
    dispatch({type: END_LOADING});

};

