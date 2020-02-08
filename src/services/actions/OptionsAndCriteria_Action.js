import axios from "axios";
import {
    GET_ITEMS,
    CREATE_ITEM,
    START_LOADING,
    END_LOADING,
    DELETE_ITEM,
    EDIT_ITEM,
    GET_ERRORS,
    START_FETCHING_DATA_PACKAGE,
    END_FETCHING_DATA_PACKAGE,
} from "./types";


export const get_items = (itemsKey, decisionId, calculatedScore) => async dispatch => {

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

export const create_item = (newEntry, itemsKey, decisionId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    //Get Information
    try {
        const res = await axios.post(`/api/decisions/${decisionId}/${itemsKey}/`, newEntry);
        dispatch({
            type: CREATE_ITEM,
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

export const delete_item = (id, itemsKey, decisionId) => async dispatch => {

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

export const edit_item = (newEntry, itemsKey, decisionId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});
    dispatch({type: START_FETCHING_DATA_PACKAGE});

    //Get Information
    try {
        const res = await axios.put(`/api/decisions/${decisionId}/${itemsKey}/`, newEntry);
        dispatch({
            type: EDIT_ITEM,
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