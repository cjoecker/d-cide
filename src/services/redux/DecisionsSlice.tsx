import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "./rootReducer";

export type Decision = {
	id: number;
	name: string;
};


const DecisionsSlice = createSlice({
	name: "Decision",
	initialState: [],
	reducers: {
		setDecisions(state, action: PayloadAction<Decision[]>):typeof state {
			return action.payload;
		},
		addDecision(state, action: PayloadAction<Decision>):typeof state {
			return [action.payload, ...state];
		},
		updateDecision(state, action: PayloadAction<Decision>):typeof state {
			return state.map((item) =>
				item.id === action.payload.id ? action.payload : item
			)
		},
		deleteDecision(state, action: PayloadAction<Decision>):typeof state {
			return state.filter(
				(decision) => decision.id !== action.payload.id
			);
		},
	},
});

export default DecisionsSlice;
