import { DELETE_DECISION, POST_DECISION, PUT_DECISION } from "../actions/types";
import { ThunkAction } from "redux-thunk";
// import { rootState } from "./store";
import { Action, Dispatch } from "redux";
import { AppActionTypes, showHTTPAlert } from "./App_Actions";
import axios, { AxiosError, AxiosPromise } from "axios";
import Decision from "../../scenes/Decision/Decision";

// export const postDecision = (newEntry) => async (dispatch) => {
// 	dispatch(httpRequest("post", `/api/decisions/`, newEntry, POST_DECISION));
// };
//
// export const deleteDecision = (id) => async (dispatch) => {
// 	dispatch(
// 		httpRequest("delete", `/api/decisions/${id}`, null, DELETE_DECISION, id)
// 	);
// };
//
// export const putDecision = (newItem) => async (dispatch) => {
// 	dispatch(httpRequest("put", `/api/decisions/`, newItem, PUT_DECISION));
// };

export enum DecisionsActionTypes {
	setDecisions = "setDecisions",
	addDecision = "addDecision",
	updateDecision = "updateDecision",
	deleteDecision = "deleteDecision",
}

export const getDecisions = (dispatch: Dispatch) => {
	// httpRequest(
	// 	axios.get(`/api/decisions`),
	// 	DecisionsActionTypes.setDecisions,
	// 	"decisions"
	// );
};

//TODO:replace root state
// const httpRequest = (
// 	axiosPromise: AxiosPromise,
// 	actionType: string,
// 	payloadObject: string
// ): ThunkAction<void, rootState, null, Action<string>> => async (dispatch) => {
// 	await dispatch({
// 		type: AppActionTypes.startLoading,
// 	});
//
// 	axiosPromise
// 		.then((answer) => {
// 			dispatch({
// 				type: actionType,
// 				payload: { [payloadObject]: answer.data },
// 			});
// 		})
// 		.catch((error: AxiosError) => {
// 			showHTTPAlert(dispatch, error);
// 		})
// 		.finally(() => {
// 			dispatch({
// 				type: AppActionTypes.endLoading,
// 			});
// 		});
// };

