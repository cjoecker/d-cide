import axios from "axios";
import { AppDispatch } from "./store";
import { AxiosRequest, SuccessActionType } from "./AxiosRequest";
import OptionsAndCriteriaSlice, {
	OptionAndCriteria,
	OptionsAndCriteriaKeys,
} from "./OptionsAndCriteriaSlice";

export const getOptionsAndCriteria = (
	dispatch: AppDispatch,
	decisionId: string,
	itemsKey: OptionsAndCriteriaKeys,
	calculatedScore: boolean
): void => {
	const params = {
		params: {
			calculatedScore,
		},
	};

	const successAction: SuccessActionType =
		itemsKey === OptionsAndCriteriaKeys.decisionOptions
			? OptionsAndCriteriaSlice.actions.setDecisionOptions.bind(null)
			: OptionsAndCriteriaSlice.actions.setSelectionCriteria.bind(null);

	dispatch(
		AxiosRequest(
			axios.get<OptionAndCriteria[]>(
				`/api/decisions/${decisionId}/${itemsKey}/`,
				params
			),
			successAction
		)
	);
};

export const postOptionsAndCriteria = (
	dispatch: AppDispatch,
	decisionId: string,
	itemsKey: OptionsAndCriteriaKeys,
	itemName: string
): void => {
	const newItem = {
		name: itemName,
	};

	const successAction: SuccessActionType =
		itemsKey === OptionsAndCriteriaKeys.decisionOptions
			? OptionsAndCriteriaSlice.actions.addDecisionOption.bind(null)
			: OptionsAndCriteriaSlice.actions.addSelectionCriteria.bind(null);

	dispatch(
		AxiosRequest(
			axios.post<OptionAndCriteria>(
				`/api/decisions/${decisionId}/${itemsKey}/`,
				newItem
			),
			successAction
		)
	);
};

export const editOptionsAndCriteria = (
	dispatch: AppDispatch,
	decisionId: string,
	itemsKey: OptionsAndCriteriaKeys,
	item: OptionAndCriteria
): void => {
	const newItem = {
		id: item.id,
		name: item.name,
	};

	const successAction: SuccessActionType =
		itemsKey === OptionsAndCriteriaKeys.decisionOptions
			? OptionsAndCriteriaSlice.actions.updateDecisionOption.bind(null)
			: OptionsAndCriteriaSlice.actions.updateSelectionCriteria.bind(null);

	dispatch(
		AxiosRequest(
			axios.put<OptionAndCriteria>(
				`/api/decisions/${decisionId}/${itemsKey}`,
				newItem
			),
			successAction
		)
	);
};

export const deleteOptionsAndCriteria = (
	dispatch: AppDispatch,
	decisionId: string,
	itemsKey: OptionsAndCriteriaKeys,
	itemId: number
): void => {
	const successAction: SuccessActionType =
		itemsKey === OptionsAndCriteriaKeys.decisionOptions
			? OptionsAndCriteriaSlice.actions.deleteDecisionOption.bind(null)
			: OptionsAndCriteriaSlice.actions.deleteSelectionCriteria.bind(null);

	dispatch(
		AxiosRequest(
			axios.delete(`/api/decisions/${decisionId}/${itemsKey}/${itemId}`),
			successAction,
			null
			,null,
			itemId
		)
	);
};
