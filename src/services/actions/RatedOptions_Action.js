import axios from "axios";
import {
    GET_RATED_OPTIONS,
    PUT_RATED_OPTION,
} from "./types";
import {httpRequest} from "./HttpDispatcher";


export const getRatedOptions = (decisionId) => async dispatch => {

    dispatch(httpRequest(axios.get(`/api/decisions/${decisionId}/ratedOptions`), GET_RATED_OPTIONS));

};

export const putRatedOption = (decisionId, options) => async dispatch => {

    dispatch(httpRequest(axios.put(`/api/decisions/${decisionId}/ratedOptions`, options), PUT_RATED_OPTION));

};

