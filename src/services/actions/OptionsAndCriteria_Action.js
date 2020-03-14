import axios from "axios";
import {GET_DECISION_OPTIONS, POST_DECISION_OPTION, DELETE_DECISION_OPTION, PUT_DECISION_OPTION} from "../actions/types";
import {GET_SELECTION_CRITERIA, POST_SELECTION_CRITERIA, DELETE_SELECTION_CRITERIA, PUT_SELECTION_CRITERIA} from "../actions/types";
import {httpRequest} from "./HttpDispatcher";


export const getItems = (itemsKey, decisionId, calculatedScore) => async dispatch => {

    let action = itemsKey === "decisionOptions" ? GET_DECISION_OPTIONS : GET_SELECTION_CRITERIA;

    httpRequest(axios.get(`/api/decisions/${decisionId}/${itemsKey}`, {
            params: {
                calculatedScore: calculatedScore
            }
        }), action);

};

export const postItem = (newEntry, itemsKey, decisionId) => async dispatch => {

    let action = itemsKey === "decisionOptions" ? POST_DECISION_OPTION : POST_SELECTION_CRITERIA;

    dispatch(httpRequest(axios.post(`/api/decisions/${decisionId}/${itemsKey}/`, newEntry), action));

};

export const deleteItem = (id, itemsKey, decisionId) => async dispatch => {

    let action = itemsKey === "decisionOptions" ? DELETE_DECISION_OPTION : DELETE_SELECTION_CRITERIA;

    dispatch(httpRequest(axios.delete(`/api/decisions/${decisionId}/${itemsKey}/${id}`), action));

};

export const putItem = (newEntry, itemsKey, decisionId) => async dispatch => {

    let action = itemsKey === "decisionOptions" ? PUT_DECISION_OPTION : PUT_SELECTION_CRITERIA;

    dispatch(httpRequest(axios.put(`/api/decisions/${decisionId}/${itemsKey}/`, newEntry), action));

};