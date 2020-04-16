import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Decision = {
	id: number;
	name: string;
	user?: user;
};

type user = {
	username: string;
	password: string;
};

const DecisionsSlice = createSlice({
	name: "Decision",
	initialState: [],
	reducers: {
		setDecisions(state, action: PayloadAction<Decision[]>): typeof state {
			return action.payload;
		},
		addDecision(state, action: PayloadAction<Decision>): typeof state {
			return [action.payload, ...state];
		},
		updateDecision(state, action: PayloadAction<Decision>): typeof state {
			return state.map((item) =>
				item.id === action.payload.id ? action.payload : item
			);
		},
		deleteDecision(state, action: PayloadAction<Decision>): typeof state {
			return state.filter((decision) => decision.id !== action.payload.id);
		},
	},
});

export default DecisionsSlice;
