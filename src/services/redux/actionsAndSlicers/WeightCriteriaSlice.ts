import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {OptionAndCriteria} from './OptionsAndCriteriaSlice';

export type WeightedCriteriaType = {
	id: number;
	weight: number;
	selectionCriteria1Id: number;
	selectionCriteria2Id: number;
};

const initialState: WeightedCriteriaType[] = [];

const WeightedCriteriaSlice = createSlice({
	name: 'WeightedCriteria',
	initialState,
	reducers: {
		setWeightedCriteria(state, action: PayloadAction<WeightedCriteriaType[]>): typeof state {
			return action.payload;
		},
		updateWeightedCriteria(state, action: PayloadAction<WeightedCriteriaType>): typeof state {
			return state.map(item => (item.id === action.payload.id ? action.payload : item));
		},
		deleteWeightedCriteriaOfSelectionCriteria(state, action: PayloadAction<OptionAndCriteria>): typeof state {
			return state.filter(
				item => item.selectionCriteria1Id !== action.payload.id && item.selectionCriteria2Id !== action.payload.id
			);
		},
	},
});

export default WeightedCriteriaSlice;
