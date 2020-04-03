import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosRequest } from "./axiosRequest";
import { AppDispatch } from "./store";

type DecisionsState = {
	decisions: Decision[];
};

export type Decision = {
	id: number;
	name: string;
};


const DecisionsSlice = createSlice({
	name: "Decision",
	initialState: [],
	reducers: {
		setDecisions(state, action: PayloadAction<Decision[]>) {
			return action.payload;
		},
		addDecision(state, action: PayloadAction<Decision>) {
			return [action.payload, ...state];
		},
		updateDecision(state) {},
		deleteDecision(state, action: PayloadAction<Decision>) {
			return state.filter(
				(decision) => decision.id !== action.payload.id
			);
		},
	},
});

export default DecisionsSlice;
