import axios from 'axios';
import store, {AppDispatch} from '../store';
import {AxiosRequest, ErrorActionType} from '../AxiosRequest';
import WeightedCriteriaSlice, {WeightedCriteria} from './WeightCriteriaSlice';
import {showHTTPAlert} from './AppActions';

export const getWeightedCriteria = (dispatch: AppDispatch, decisionId: string) => {
	dispatch(
		AxiosRequest(
			axios.get<WeightedCriteria[]>(`/api/decisions/${decisionId}/weightedCriteria`),
			WeightedCriteriaSlice.actions.setWeightedCriteria.bind(null)
		)
	);
};

export const updateWeightedCriteria = (dispatch: AppDispatch, decisionId: string, criteria: WeightedCriteria) => {
	dispatch(
		AxiosRequest(
			axios.put<WeightedCriteria[]>(`/api/decisions/${decisionId}/weightedCriteria/`, criteria),
			WeightedCriteriaSlice.actions.updateWeightedCriteria.bind(null),
			null,
			updateErrorAction.bind(null),
			criteria
		)
	);
};

const updateErrorAction: ErrorActionType = (dispatch, error, predefinedPayload: WeightedCriteria) => {
	showHTTPAlert(dispatch, error);
	resetSliderOnError(dispatch, predefinedPayload);
};

const resetSliderOnError = (dispatch: AppDispatch, predefinedPayload: WeightedCriteria) => {
	const state = store.getState();
	const initialCriteria = state.WeightedCriteria.find(criteria => criteria.id === predefinedPayload.id);
	dispatch(WeightedCriteriaSlice.actions.updateWeightedCriteria(initialCriteria as WeightedCriteria));
};
