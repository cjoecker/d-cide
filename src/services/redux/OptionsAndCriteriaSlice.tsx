import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
		) {
			state.decisionOptions = action.payload;
		},
		addDecisionOption(state, action: PayloadAction<OptionAndCriteria>) {
			state.decisionOptions = [action.payload, ...state.decisionOptions];
		},
		updateDecisionOption(state, action: PayloadAction<OptionAndCriteria>){
			state.decisionOptions = state.decisionOptions.map((item) =>
				item.id === action.payload.id ? action.payload : item
			)
		},
		deleteDecisionOption(
			state,
			action: PayloadAction<number>
		) {
			state.decisionOptions = state.decisionOptions.filter(
				(item) => item.id !== action.payload
			);
		},
		setSelectionCriteria(
			state,
			action: PayloadAction<OptionAndCriteria[]>
		) {
			state.selectionCriteria = action.payload;
		},
		addSelectionCriteria(state, action: PayloadAction<OptionAndCriteria>) {
			state.selectionCriteria = [action.payload, ...state.selectionCriteria];
		},
		updateSelectionCriteria(state, action: PayloadAction<OptionAndCriteria>){
			state.selectionCriteria = state.selectionCriteria.map((item) =>
				item.id === action.payload.id ? action.payload : item
			)
		},
		deleteSelectionCriteria(state, action: PayloadAction<number>) {
			state.selectionCriteria = state.selectionCriteria.filter(
				(item) => item.id !== action.payload
			);
		},
	},
});

export default OptionsAndCriteriaSlice;
