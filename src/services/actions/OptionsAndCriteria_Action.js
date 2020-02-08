import axios from "axios";
import {
    GET_ITEMS,
    POST_ITEM,
    START_LOADING,
    END_LOADING,
    DELETE_ITEM,
    PUT_ITEM,
    GET_ERRORS,
    START_FETCHING_DATA_PACKAGE,
    END_FETCHING_DATA_PACKAGE,
} from "./types";


export const getItems = (itemsKey, decisionId, calculatedScore) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});


    //Get Information
    try {
        const res = await axios.get(`/api/decisions/${decisionId}/${itemsKey}`, {
            params: {
                calculatedScore: calculatedScore
            }
        });

        dispatch({
            type: GET_ITEMS,
            payload: res.data,
            itemsKey: itemsKey
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

export const postItem = (newEntry, itemsKey, decisionId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    //Get Information
    try {
        const res = await axios.post(`/api/decisions/${decisionId}/${itemsKey}/`, newEntry);
        dispatch({
            type: POST_ITEM,
            payload: res.data,
            itemsKey: itemsKey
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

export const deleteItem = (id, itemsKey, decisionId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    //Get Information
    try {
        const res = await axios.delete(`/api/decisions/${decisionId}/${itemsKey}/${id}`);
        dispatch({
            type: DELETE_ITEM,
            payload: id,
            itemsKey: itemsKey,
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

export const putItem = (newEntry, itemsKey, decisionId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    //Get Information
    try {
        const res = await axios.put(`/api/decisions/${decisionId}/${itemsKey}/`, newEntry);
        dispatch({
            type: PUT_ITEM,
            payload: res.data,
            itemsKey: itemsKey
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