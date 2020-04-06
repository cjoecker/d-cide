import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "./rootReducer";

export type OptionAndCriteria = {
	id: number;
	name: string;
	score: number;
};

export enum OptionsAndCriteriaKeys{
	decisionOptions = "decisionOptions",
	selectionCriteria = "selectionCriteria"
}

type OptionsAndCriteriaState = {
	decisionOptions: OptionAndCriteria[];
	selectionCriteria: OptionAndCriteria[];
};

const initialState: OptionsAndCriteriaState = {
	decisionOptions: [],
	selectionCriteria: [],
};


const OptionsAndCriteriaSlice = createSlice({
	name: "OptionsAndCriteria",
	initialState,
	reducers: {
		setDecisionOptions(
			state: OptionsAndCriteriaState,
			action: PayloadAction<OptionAndCriteria[]>
		): void {
			state.decisionOptions = action.payload;
		},
		addDecisionOption(state, action: PayloadAction<OptionAndCriteria>): void {
			state.decisionOptions = [action.payload, ...state.decisionOptions];
		},
		updateDecisionOption(state):typeof state {
			return state;
		},
		deleteDecisionOption(
			state,
			action: PayloadAction<number>
		): void {
			state.decisionOptions = state.decisionOptions.filter(
				(item) => item.id !== action.payload
			);
		},
		setSelectionCriteria(
			state,
			action: PayloadAction<OptionAndCriteria[]>
		): void {
			state.selectionCriteria = action.payload;
		},
		addSelectionCriteria(state, action: PayloadAction<OptionAndCriteria>): void {
			state.selectionCriteria = [action.payload, ...state.selectionCriteria];
		},
		updateSelectionCriteria(state):typeof state {
			return state;
		},
		deleteSelectionCriteria(state, action: PayloadAction<number>): void {
			state.selectionCriteria = state.selectionCriteria.filter(
				(item) => item.id !== action.payload
			);
		},
	},
});

export default OptionsAndCriteriaSlice;
