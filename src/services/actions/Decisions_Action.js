import axios from "axios";
import {
    GET_DECISIONS,
    POST_DECISION,
    DELETE_DECISION,
    PUT_DECISION,
} from "./types";
import {httpRequest} from "./HttpDispatcher";

export const getDecisions = () => async dispatch => {
   dispatch(httpRequest(`/api/decisions`, GET_DECISIONS));
};

export const postDecision = (newEntry) => async dispatch => {
    dispatch(httpRequest(axios.post(`/api/decisions/`, newEntry), POST_DECISION));
};

export const deleteDecision = (id) => async dispatch => {
    dispatch(httpRequest(axios.delete(`/api/decisions/${id}`), DELETE_DECISION));
};

export const putDecision = (newItem) => async dispatch => {
    dispatch(httpRequest(axios.put(`/api/decisions/`, newItem), PUT_DECISION));
};