import axios from "axios";
import { AppDispatch } from "../store";
import { AxiosRequest } from "../AxiosRequest";
import DecisionsSlice, { Decision } from "./DecisionsSlice";

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
		AxiosRequest(
			axios.get<Decision[]>(`/api/decisions`),
			DecisionsSlice.actions.setDecisions.bind(null)
		)
	);
};

export const postDecision = (dispatch: AppDispatch, decision: newDecision) => {
	dispatch(
		AxiosRequest(
			axios.post(`/api/decisions/`, decision),
			DecisionsSlice.actions.addDecision.bind(null)
		)
	);
};

export const changeDecision = (dispatch: AppDispatch, decision: Decision) => {
	dispatch(
		AxiosRequest(
			axios.put(`/api/decisions/`, decision),
			DecisionsSlice.actions.updateDecision.bind(null)
		)
	);
};
export const deleteDecision = (dispatch: AppDispatch, decision: Decision) => {
	dispatch(
		AxiosRequest(
			axios.delete(`/api/decisions/${decision.id}`),
			DecisionsSlice.actions.deleteDecision.bind(null),
			null,
			null,
			decision
		)
	);
};

export type newDecision = {
	name: string;
};
