import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RatedOption = {
	id: number;
	score: number;
	decisionOptionId: number;
	selectionCriteriaId: number;
};

const RatedOptionsSlice = createSlice({
	name: "RatedOptions",
	initialState: [],
	reducers: {
		setRatedOptions(
			state,
			action: PayloadAction<RatedOption[]>
		): typeof state {
			return action.payload;
		},
		updateRatedOptions(
			state,
			action: PayloadAction<RatedOption>
		): typeof state {
			return state.map((item) =>
				item.decisionOptionId === action.payload.decisionOptionId &&
				item.selectionCriteriaId === action.payload.selectionCriteriaId
					? action.payload
					: item
			);
		},
	},
});

export default RatedOptionsSlice;
