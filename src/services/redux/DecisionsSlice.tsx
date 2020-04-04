import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "./rootReducer";

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
		setDecisions(state, action: PayloadAction<Decision[]>):RootState {
			return action.payload;
		},
		addDecision(state, action: PayloadAction<Decision>):RootState {
			return [action.payload, ...state];
		},
		updateDecision(state): RootState {
			return state;
		},
		deleteDecision(state, action: PayloadAction<Decision>):RootState {
			return state.filter(
				(decision) => decision.id !== action.payload.id
			);
		},
	},
});

export default DecisionsSlice;
