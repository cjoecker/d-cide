import axios from "axios";
import {START_LOADING, END_LOADING, GET_CRITERIA, CHANGE_CRITERIA, GET_ERRORS, SEND_EVERY_CRITERIA} from "./types";


export const get_criteria = (projectId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.get(`/api/every_weightedCriteria/${projectId}`);
        dispatch({
            type: GET_CRITERIA,
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


export const change_criteria = (criteria) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.post(`/api/weightedCriteria`, criteria);
        dispatch({
            type: CHANGE_CRITERIA
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

export const send_every_criteria = (criteria) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.post(`/api/every_weightedCriteria`, criteria);
        dispatch({
            type: SEND_EVERY_CRITERIA,
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
