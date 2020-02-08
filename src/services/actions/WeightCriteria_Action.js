import axios from "axios";
import {
    START_LOADING,
    END_LOADING,
    GET_WEIGHTED_CRITERIA,
    PUT_WEIGHTED_CRITERIA,
    GET_ERRORS,
    START_FETCHING_DATA_PACKAGE,
    END_FETCHING_DATA_PACKAGE,
} from "./types";


export const getWeightedCriteria = (decisionId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.get(`/api/decisions/${decisionId}/weightedCriteria`);
        dispatch({
            type: GET_WEIGHTED_CRITERIA,
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

export const putWeightedCriteria = (decisionId, criteria) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    //Get Information
    try {
        const res = await axios.put(`/api/decisions/${decisionId}/weightedCriteria`, criteria);
        dispatch({
            type: PUT_WEIGHTED_CRITERIA,
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
