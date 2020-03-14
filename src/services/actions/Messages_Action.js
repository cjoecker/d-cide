import {
    SHOW_MESSAGE,
    DELETE_MESSAGE,
} from "./types";


export const showMessage = (message) => async dispatch => {
    dispatch({
        type: SHOW_MESSAGE,
        payload: message,
    });
};

export const deleteMessage = (message) => async dispatch => {
    dispatch({
        type: DELETE_MESSAGE,
        payload: message,
    });
};