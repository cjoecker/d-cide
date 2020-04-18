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
	},
});

export default DecisionsSlice;
