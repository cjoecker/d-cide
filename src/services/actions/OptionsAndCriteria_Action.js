import axios from "axios";
import {GET_ITEMS, CREATE_ITEM, START_LOADING, END_LOADING, DELETE_ITEM, EDIT_ITEM, GET_ERRORS} from "./types";


export const get_items = (itemsKey, projectId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.get(`/api/every_${itemsKey}/${projectId}`);
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

export const create_item = (newEntry, itemsKey, projectId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.post(`/api/${itemsKey}/${projectId}`, newEntry);
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
    dispatch({type: END_LOADING});

};

export const delete_item = (id, itemsKey) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.delete(`/api/${itemsKey}/${id}`);
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
    dispatch({type: END_LOADING});

};

export const edit_item = (newEntry, itemsKey, projectId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.post(`/api/${itemsKey}/${projectId}`, newEntry);
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
    dispatch({type: END_LOADING});

};