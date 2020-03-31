import {
	GET_DECISIONS,
	POST_DECISION,
	DELETE_DECISION,
	PUT_DECISION,
} from "../actions/types";
import { httpRequest } from "./HttpDispatcher";
import {ThunkAction} from "redux-thunk";
import {rootState} from "./store";
import {Action} from "redux";
import {AppActionTypes, showHTTPAlert} from "./App_Actions";
import axios, {AxiosAdapter, AxiosError, AxiosPromise} from "axios";
import {SessionActionTypes} from "./Sessions_Actions";



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


export enum DecisionsActionTypes {
	setDecisions = "setDecisions",
	addDecision = "addDecision",
	updateDecision = "updateDecision",
	deleteDecision = "deleteDecision",
}


export const getDecisions = ()=>{
	httpRequest(axios.get(`/api/decisions`),  DecisionsActionTypes.setDecisions)
};

//TODO:replace root state
const httpRequest = (axiosPromise: AxiosPromise, actionType:DecisionsActionTypes): ThunkAction<void, rootState, null, Action<string>> => async dispatch => {

	await dispatch({
		type: AppActionTypes.startLoading
	});

	axiosPromise.then((answer) => {
			dispatch({
				type: actionType,
				payload: answer.data
			});
		})
		.catch((error: AxiosError) => {
			showHTTPAlert(dispatch, error);
		}).finally(() => {
		dispatch({
			type: AppActionTypes.endLoading
		});
	})
};