import axios from "axios";
import {
	GET_DECISION_OPTIONS,
	POST_DECISION_OPTION,
	DELETE_DECISION_OPTION,
	PUT_DECISION_OPTION,
	GET_SELECTION_CRITERIA,
	POST_SELECTION_CRITERIA,
	DELETE_SELECTION_CRITERIA,
	PUT_SELECTION_CRITERIA,
} from "../actions/types";

import { AppDispatch } from "./store";
import { AxiosRequest } from "./AxiosRequest";
import DecisionsSlice from "./DecisionsSlice";
import { OptionAndCriteria } from "./OptionsAndCriteriaSlice";
// import { httpRequest } from "../redux/AxiosRequest";

export const getItems = (itemsKey, decisionId, calculatedScore) => async (
	dispatch
) => {
	let action =
		itemsKey === "decisionOptions"
			? GET_DECISION_OPTIONS
			: GET_SELECTION_CRITERIA;

	let params = {
		params: {
			calculatedScore: calculatedScore,
		},
	};

	dispatch();
	// httpRequest(
	// 	"get",
	// 	`/api/decisions/${decisionId}/${itemsKey}`,
	// 	params,
	// 	action
	// )
};

export const postItem = (newEntry, itemsKey, decisionId) => async (
	dispatch
) => {
	let action =
		itemsKey === "decisionOptions"
			? POST_DECISION_OPTION
			: POST_SELECTION_CRITERIA;

	dispatch();
	// httpRequest(
	// 	"post",
	// 	`/api/decisions/${decisionId}/${itemsKey}/`,
	// 	newEntry,
	// 	action
	// )
};

export const deleteItem = (id, itemsKey, decisionId) => async (dispatch) => {
	let action =
		itemsKey === "decisionOptions"
			? DELETE_DECISION_OPTION
			: DELETE_SELECTION_CRITERIA;

	dispatch();
	// httpRequest(
	// 	"delete",
	// 	`/api/decisions/${decisionId}/${itemsKey}/${id}`,
	// 	null,
	// 	action,
	// 	id
	// )
};

export const putItem = (newEntry, itemsKey, decisionId) => async (dispatch) => {
	let action =
		itemsKey === "decisionOptions"
			? PUT_DECISION_OPTION
			: PUT_SELECTION_CRITERIA;

	dispatch();
	// httpRequest(
	// 	"put",
	// 	`/api/decisions/${decisionId}/${itemsKey}/`,
	// 	newEntry,
	// 	action
	// )
};

export const getDecisions = (
	dispatch: AppDispatch,
	decisionId: string,
	itemsKey: string,
	calculatedScore: boolean
) => {
	const params = {
		params: {
			calculatedScore,
		},
	};

	dispatch(
		AxiosRequest(
			axios.get<OptionAndCriteria[]>(
				`/api/decisions/${decisionId}/${itemsKey}`,
				params
			),
			DecisionsSlice.actions.setDecisions.bind(null)
		)
	);
};
