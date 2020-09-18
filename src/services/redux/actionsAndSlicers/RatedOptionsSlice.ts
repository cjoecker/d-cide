import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OptionAndCriteria} from './OptionsAndCriteriaSlice';

export type RatedOption = {
	id: number;
	score: number;
	decisionOptionId: number;
	selectionCriteriaId: number;
};

const initialState: RatedOption[] = [];

const RatedOptionsSlice = createSlice({
	name: 'RatedOptions',
	initialState,
	reducers: {
		setRatedOptions(state, action: PayloadAction<RatedOption[]>): typeof state {
			return action.payload;
		},
		updateRatedOptions(state, action: PayloadAction<RatedOption>): typeof state {
			return state.map(item =>
				item.decisionOptionId === action.payload.decisionOptionId &&
				item.selectionCriteriaId === action.payload.selectionCriteriaId
					? action.payload
					: item
			);
		},
		deleteRatedOptionsOfDecisionOption(state, action: PayloadAction<OptionAndCriteria>): typeof state {
			return state.filter(item => item.decisionOptionId !== action.payload.id);
		},
		deleteRatedOptionsOfSelectionCriteria(state, action: PayloadAction<OptionAndCriteria>): typeof state {
			return state.filter(item => item.selectionCriteriaId !== action.payload.id);
		},
	},
});

export default RatedOptionsSlice;
