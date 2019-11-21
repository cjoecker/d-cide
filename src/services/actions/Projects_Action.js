import axios from "axios";
import {
    GET_PROJECTS,
    CREATE_PROJECT,
    START_LOADING,
    END_LOADING,
    DELETE_PROJECT,
    EDIT_PROJECT,
    CREATE_EXAMPLE_DATA,
    GET_ERRORS,
    TRANSFER_PROJECT_TO_USER,
} from "./types";


export const get_projects = () => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.get(`/api/every_project`);
        dispatch({
            type: GET_PROJECTS,
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

export const create_project = (newEntry) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.post(`/api/project`, newEntry);
        dispatch({
            type: CREATE_PROJECT,
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

export const delete_project = (id) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.delete(`/api/project/${id}`);
        dispatch({
            type: DELETE_PROJECT,
            payload: id,
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

export const edit_project = (newItem) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.post(`/api/project`, newItem);
        dispatch({
            type: EDIT_PROJECT
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

export const create_exampleData = () => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.post(`/api/createExampleData`);
        dispatch({
            type: CREATE_EXAMPLE_DATA,
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

export const transfer_projectToUser = (username) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.put(`/api/transferProjectToUser`,username, {headers: {"Content-Type": "text/plain"}});
        dispatch({
            type: TRANSFER_PROJECT_TO_USER,
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