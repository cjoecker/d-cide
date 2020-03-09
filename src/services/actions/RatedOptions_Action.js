import axios from "axios";
import {
    START_LOADING,
    END_LOADING,
    GET_RATED_OPTIONS,
    GET_ERRORS,
    PUT_RATED_OPTION,
    START_FETCHING_DATA_PACKAGE,
    END_FETCHING_DATA_PACKAGE,
} from "./types";


export const getRatedOptions = (decisionId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.get(`/api/decisions/${decisionId}/ratedOptions`);
        dispatch({
            type: GET_RATED_OPTIONS,
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

export const putRatedOption = (decisionId, options) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});
    //Get Information
    try {
        const res = await axios.put(`/api/decisions/${decisionId}/ratedOptions`, options);
        dispatch({
            type: PUT_RATED_OPTION
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

