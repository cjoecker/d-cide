import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosRequest } from "./axiosRequest";

type DecisionsState = {
	decisions: Decision[];
};

type Decision = {
	id: number;
	name: string;
};

let initialState: DecisionsState = {
	decisions: [],
};

const DecisionsSlice = createSlice({
	name: "Decision",
	initialState: initialState,
	reducers: {
		setDecisions(state, action: PayloadAction<Decision[]>) {
			state.decisions = action.payload;
		},
		addDecision(state, action: PayloadAction<Decision>) {
			state.decisions = [action.payload, ...state.decisions];
		},
		updateDecision(state) {},
		deleteDecision(state, action: PayloadAction<Decision>) {
			state.decisions = state.decisions.filter(
				(decision) => decision.id !== action.payload.id
			);
		},
	},
});

export default DecisionsSlice;

export const getDecisions = () => {
	axiosRequest(
		axios.get(`/api/decisions`),
		DecisionsSlice.actions.setDecisions.bind(null)
	);
};
