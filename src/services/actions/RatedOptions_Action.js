import axios from "axios";
import {
    GET_RATED_OPTIONS, GET_WEIGHTED_CRITERIA,
    PUT_RATED_OPTION,
} from "./types";
import {httpRequest} from "./HttpDispatcher";


export const getRatedOptions = (decisionId) => async dispatch => {
    dispatch(httpRequest("get",`/api/decisions/${decisionId}/ratedOptions`, null ,GET_RATED_OPTIONS));
};

export const putRatedOption = (decisionId, options) => async dispatch => {
    dispatch(httpRequest("put",`/api/decisions/${decisionId}/ratedOptions`, options ,PUT_RATED_OPTION));
};

