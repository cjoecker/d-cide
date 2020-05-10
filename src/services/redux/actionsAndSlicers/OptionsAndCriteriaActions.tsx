import axios from 'axios';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import store, {AppDispatch} from '../store';
import {AxiosRequest, ErrorActionType} from '../AxiosRequest';
import OptionsAndCriteriaSlice, {OptionAndCriteria, OptionsAndCriteriaKeys} from './OptionsAndCriteriaSlice';
import {showHTTPAlert} from './AppActions';

export const getOptionsAndCriteria = (
	dispatch: AppDispatch,
	decisionId: string,
	itemsKey: OptionsAndCriteriaKeys,
	calculatedScore: boolean
) => {
	const params = {
		params: {
			calculatedScore,
		},
	};

	const successAction: ActionCreatorWithPayload<OptionAndCriteria[]> =
		itemsKey === OptionsAndCriteriaKeys.decisionOptions
			? OptionsAndCriteriaSlice.actions.setDecisionOptions.bind(null)
			: OptionsAndCriteriaSlice.actions.setSelectionCriteria.bind(null);

	dispatch(
		AxiosRequest(axios.get<OptionAndCriteria[]>(`/api/decisions/${decisionId}/${itemsKey}/`, params), successAction)
	);
};

export const postOptionsAndCriteria = (
	dispatch: AppDispatch,
	decisionId: string,
	itemsKey: OptionsAndCriteriaKeys,
	itemName: string
) => {
	const newItem = {
		name: itemName,
	};

	const successAction: ActionCreatorWithPayload<OptionAndCriteria> =
		itemsKey === OptionsAndCriteriaKeys.decisionOptions
			? OptionsAndCriteriaSlice.actions.addDecisionOption.bind(null)
			: OptionsAndCriteriaSlice.actions.addSelectionCriteria.bind(null);

	dispatch(
		AxiosRequest(axios.post<OptionAndCriteria>(`/api/decisions/${decisionId}/${itemsKey}/`, newItem), successAction)
	);
};

export const editOptionsAndCriteria = (
	dispatch: AppDispatch,
	decisionId: string,
	itemsKey: OptionsAndCriteriaKeys,
	item: OptionAndCriteria
) => {
	const newItem = {
		id: item.id,
		name: item.name,
	};
	const successAction: ActionCreatorWithPayload<OptionAndCriteria> =
		itemsKey === OptionsAndCriteriaKeys.decisionOptions
			? OptionsAndCriteriaSlice.actions.updateDecisionOption.bind(null)
			: OptionsAndCriteriaSlice.actions.updateSelectionCriteria.bind(null);

	const errorAction: ErrorActionType =
		itemsKey === OptionsAndCriteriaKeys.decisionOptions
			? editOptionErrorAction.bind(null)
			: editCriteriaErrorAction.bind(null);

	dispatch(
		AxiosRequest(
			axios.put<OptionAndCriteria>(`/api/decisions/${decisionId}/${itemsKey}/`, newItem),
			successAction,
			null,
			errorAction,
			item
		)
	);
};

export const deleteOptionsAndCriteria = (
	dispatch: AppDispatch,
	decisionId: string,
	itemsKey: OptionsAndCriteriaKeys,
	itemId: number
) => {
	const successAction: ActionCreatorWithPayload<number> =
		itemsKey === OptionsAndCriteriaKeys.decisionOptions
			? OptionsAndCriteriaSlice.actions.deleteDecisionOption.bind(null)
			: OptionsAndCriteriaSlice.actions.deleteSelectionCriteria.bind(null);

	dispatch(
		AxiosRequest(axios.delete(`/api/decisions/${decisionId}/${itemsKey}/${itemId}`), successAction, null, null, itemId)
	);
};

const editOptionErrorAction: ErrorActionType = (dispatch, error, predefinedPayload: OptionAndCriteria) => {
	showHTTPAlert(dispatch, error);
	resetOptionOnError(dispatch, predefinedPayload);
};

const resetOptionOnError = (dispatch: AppDispatch, predefinedPayload: OptionAndCriteria) => {
	const state = store.getState();
	const initialCriteria = state.OptionsAndCriteria.decisionOptions.find(option => option.id === predefinedPayload.id);
	dispatch(OptionsAndCriteriaSlice.actions.updateDecisionOption(initialCriteria as OptionAndCriteria));
};

const editCriteriaErrorAction: ErrorActionType = (dispatch, error, predefinedPayload: OptionAndCriteria) => {
	showHTTPAlert(dispatch, error);
	resetCriteriaOnError(dispatch, predefinedPayload);
};

const resetCriteriaOnError = (dispatch: AppDispatch, predefinedPayload: OptionAndCriteria) => {
	const state = store.getState();
	const initialCriteria = state.OptionsAndCriteria.selectionCriteria.find(
		criteria => criteria.id === predefinedPayload.id
	);
	dispatch(OptionsAndCriteriaSlice.actions.updateSelectionCriteria(initialCriteria as OptionAndCriteria));
};
