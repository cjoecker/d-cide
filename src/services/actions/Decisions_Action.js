import {
	GET_DECISIONS,
	POST_DECISION,
	DELETE_DECISION,
	PUT_DECISION,
} from "./types";
import { httpRequest } from "../HttpDispatcher";

export const getDecisions = () => async (dispatch) => {
	dispatch(httpRequest("get", `/api/decisions`, null, GET_DECISIONS));
};

export const postDecision = (newEntry) => async (dispatch) => {
	dispatch(httpRequest("post", `/api/decisions/`, newEntry, POST_DECISION));
};

export const deleteDecision = (id) => async (dispatch) => {
	dispatch(
		httpRequest("delete", `/api/decisions/${id}`, null, DELETE_DECISION, id)
	);
};

export const putDecision = (newItem) => async (dispatch) => {
	dispatch(httpRequest("put", `/api/decisions/`, newItem, PUT_DECISION));
};
