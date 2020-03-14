import {END_LOADING, SHOW_MESSAGE, START_LOADING} from "./types";
import {HTTP_ERROR} from "../Messages";
import axios from "axios";


export const httpRequest = (axiosRequest, type) => async dispatch => {



    //Show Loading Bar
    dispatch({type: START_LOADING});

    try {
        const res = await axios.get(`/api/decisions`);
        dispatch({
            type: type,
            payload: res.data,
        });

    } catch (error) {
        let httpError = HTTP_ERROR;
        httpError.text = `${error.response.statusText} (${error.response.status})`;

        dispatch({
            type: SHOW_MESSAGE,
            payload: httpError,
        });
    }

    //Show Loading Bar
    dispatch({type: END_LOADING});
};