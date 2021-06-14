import {combineReducers} from '@reduxjs/toolkit';

import AppSlice from './actionsAndSlicers/AppSlice';
import OptionsAndCriteriaSlice from './actionsAndSlicers/OptionsAndCriteriaSlice';
import RatedOptionsSlice from './actionsAndSlicers/RatedOptionsSlice';
import WeightedCriteriaSlice from './actionsAndSlicers/WeightCriteriaSlice';

const rootReducer = combineReducers({
	App: AppSlice.reducer,
	OptionsAndCriteria: OptionsAndCriteriaSlice.reducer,
	WeightedCriteria: WeightedCriteriaSlice.reducer,
	RatedOptions: RatedOptionsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
