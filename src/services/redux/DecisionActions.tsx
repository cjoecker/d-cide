import { DELETE_DECISION, POST_DECISION, PUT_DECISION } from "../actions/types";
import { ThunkAction } from "redux-thunk";
// import { rootState } from "./store";
import { Action, Dispatch } from "redux";
// import { AppActionTypes, showHTTPAlert } from "./App_Actions";
import axios, { AxiosError, AxiosPromise } from "axios";
import {AppDispatch} from "./store";
import {axiosRequest} from "./axiosRequest";
import DecisionsSlice, {Decision} from "./DecisionsSlice";

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


export const getDecisions = (dispatch: AppDispatch) => {
	dispatch(
		axiosRequest(
			axios.get<Decision[]>(`/api/decisions`),
			DecisionsSlice.actions.setDecisions.bind(null)
		)
	);
};
