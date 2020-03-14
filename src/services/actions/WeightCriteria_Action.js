import axios from "axios";
import {
    GET_WEIGHTED_CRITERIA,
    PUT_WEIGHTED_CRITERIA,
} from "./types";
import {httpRequest} from "./HttpDispatcher";


export const getWeightedCriteria = (decisionId) => async dispatch => {

    dispatch(httpRequest(axios.get(`/api/decisions/${decisionId}/weightedCriteria`), GET_WEIGHTED_CRITERIA));

};

export const putWeightedCriteria = (decisionId, criteria) => async dispatch => {

    dispatch(httpRequest(axios.put(`/api/decisions/${decisionId}/weightedCriteria/`, criteria), PUT_WEIGHTED_CRITERIA));

};
