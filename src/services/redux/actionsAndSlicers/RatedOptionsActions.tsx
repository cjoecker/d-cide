import axios from "axios";
import { AppDispatch } from "../store";
import { AxiosRequest } from "../AxiosRequest";
import RatedOptionsSlice, { RatedOption } from "./RatedOptionsSlice";

export const getRatedOptions = (dispatch: AppDispatch, decisionId: string) => {
	dispatch(
		AxiosRequest(
			axios.get<RatedOption[]>(`/api/decisions/${decisionId}/ratedOptions`),
			RatedOptionsSlice.actions.setRatedOptions.bind(null)
		)
	);
};

export const updateRatedOptions = (
	dispatch: AppDispatch,
	decisionId: string,
	ratedOption: unknown
) => {
	dispatch(
		AxiosRequest(
			axios.put<RatedOption[]>(
				`/api/decisions/${decisionId}/ratedOptions/`,
				ratedOption
			),
			RatedOptionsSlice.actions.updateRatedOptions.bind(null),
			null,
			null,
			ratedOption
		)
	);
};
