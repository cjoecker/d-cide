import axios from "axios";
import store, { AppDispatch } from "../store";
import { AxiosRequest, ErrorActionType } from "../AxiosRequest";
import RatedOptionsSlice, { RatedOption } from "./RatedOptionsSlice";
import { showHTTPAlert } from "./AppActions";

export const getRatedOptions = (dispatch: AppDispatch, decisionId: string) => {
	dispatch(
		AxiosRequest(
			axios.get<RatedOption[]>(`/api/decisions/${decisionId}/ratedOptions`),
			RatedOptionsSlice.actions.setRatedOptions.bind(null)
		)
	);
};

export const updateRatedOptions = (dispatch: AppDispatch, decisionId: string, ratedOption: unknown) => {
	dispatch(
		AxiosRequest(
			axios.put<RatedOption[]>(`/api/decisions/${decisionId}/ratedOptions/`, ratedOption),
			RatedOptionsSlice.actions.updateRatedOptions.bind(null),
			null,
			updateErrorAction.bind(null),
			ratedOption
		)
	);
};

const updateErrorAction: ErrorActionType = (dispatch, error, predefinedPayload: RatedOption) => {
	showHTTPAlert(dispatch, error);
	resetSliderOnError(dispatch, predefinedPayload)
};

const resetSliderOnError = (dispatch: AppDispatch, predefinedPayload: RatedOption) => {
	const state = store.getState();
	const initialOption = state.RatedOptions.find(option => option.id === predefinedPayload.id)
	dispatch(RatedOptionsSlice.actions.updateRatedOptions(initialOption as RatedOption))
};