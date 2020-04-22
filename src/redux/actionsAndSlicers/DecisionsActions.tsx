import axios from "axios";
import { AppDispatch } from "../store";
import { AxiosRequest } from "../AxiosRequest";
import DecisionsSlice, { Decision } from "./DecisionsSlice";

export const getDecisions = (dispatch: AppDispatch) => {
	dispatch(AxiosRequest(axios.get<Decision[]>(`/api/decisions`), DecisionsSlice.actions.setDecisions.bind(null)));
};

export type newDecision = {
	name: string;
};
