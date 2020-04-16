import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WeightedCriteria = {
	id: number;
	weight: number;
	selectionCriteria1Id: number;
	selectionCriteria2Id: number;
};

const WeightedCriteriaSlice = createSlice({
	name: "WeightedCriteria",
	initialState: [],
	reducers: {
		setWeightedCriteria(
			state,
			action: PayloadAction<WeightedCriteria[]>
		): typeof state {
			return action.payload;
		},
		updateWeightedCriteria(
			state,
			action: PayloadAction<WeightedCriteria>
		): typeof state {
			return state.map((item) =>
				item.id === action.payload.id ? action.payload : item
			);
		},
	},
});

export default WeightedCriteriaSlice;
