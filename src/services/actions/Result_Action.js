import axios from "axios";
import {
    START_LOADING,
    END_LOADING,
    GET_RESULT,
    GET_ERRORS,

} from "./types";


export const get_result = (itemsKey, decisionId) => async dispatch => {

    //Show Loading Bar
    dispatch({type: START_LOADING});

    //Get Information
    try {
        const res = await axios.get(`/api/result/${itemsKey}/${decisionId}`);
        dispatch({
            type: GET_RESULT,
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
