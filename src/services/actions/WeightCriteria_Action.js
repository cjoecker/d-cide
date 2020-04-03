import axios from "axios";
import { GET_WEIGHTED_CRITERIA, PUT_WEIGHTED_CRITERIA } from "./types";
import { httpRequest } from "../redux/axiosRequest";

export const getWeightedCriteria = (decisionId) => async (dispatch) => {
	dispatch(
		httpRequest(
			"get",
			`/api/decisions/${decisionId}/weightedCriteria`,
			null,
			GET_WEIGHTED_CRITERIA
		)
	);
};

export const putWeightedCriteria = (decisionId, criteria) => async (
	dispatch
) => {
	dispatch(
		httpRequest(
			"put",
			`/api/decisions/${decisionId}/weightedCriteria/`,
			criteria,
			PUT_WEIGHTED_CRITERIA
		)
	);
};
