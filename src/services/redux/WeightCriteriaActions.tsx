import axios from "axios";
import {AppDispatch} from "./store";
import {AxiosRequest} from "./AxiosRequest";
import WeightedCriteriaSlice, {WeightedCriteria} from "./WeightCriteriaSlice";



export const getWeightedCriteria = (dispatch: AppDispatch, decisionId: string) => {
	dispatch(
		AxiosRequest(
			axios.get<WeightedCriteria[]>(`/api/decisions/${decisionId}/weightedCriteria`),
			WeightedCriteriaSlice.actions.setWeightedCriteria.bind(null)
		)
	);
};



export const updateWeightedCriteria = (dispatch: AppDispatch, decisionId: string, criteria: unknown) => {
	dispatch(
		AxiosRequest(
			axios.put<WeightedCriteria[]>(`/api/decisions/${decisionId}/weightedCriteria`, criteria),
			WeightedCriteriaSlice.actions.updateWeightedCriteria.bind(null)
		)
	);
};