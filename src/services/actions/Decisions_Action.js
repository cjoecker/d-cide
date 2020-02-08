import axios from "axios";
import {
    GET_DECISIONS,
    POST_DECISION,
    START_LOADING,
    END_LOADING,
    DELETE_DECISION,
    PUT_DECISION,
    GET_ERRORS,
    START_FETCHING_DATA_PACKAGE,
    END_FETCHING_DATA_PACKAGE,
} from "./types";


export const get_decisions = () => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.get(`/api/decisions`);
        dispatch({
            type: GET_DECISIONS,
            payload: res.data,
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

export const post_decision = (newEntry) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    //Get Information
    try {
        const res = await axios.post(`/api/decisions/`, newEntry);
        dispatch({
            type: POST_DECISION,
            payload: res.data,
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

export const delete_decision = (id) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    //Get Information
    try {
        const res = await axios.delete(`/api/decisions/${id}`);
        dispatch({
            type: DELETE_DECISION,
            payload: id,
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

export const put_decision = (newItem) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    //Get Information
    try {
        const res = await axios.put(`/api/decisions/`, newItem);
        dispatch({
            type: PUT_DECISION
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