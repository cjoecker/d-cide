import { combineReducers } from "@reduxjs/toolkit";
import AppSlice from "./AppSlice";
import SessionSlice from "./SessionSlice";
import OptionsAndCriteriaSlice from "./OptionsAndCriteriaSlice";
import DecisionsSlice from "./DecisionsSlice";
import WeightedCriteriaSlice from "./WeightCriteriaSlice";
import RatedOptionsSlice from "./RatedOptionsSlice";


const rootReducer = combineReducers({
	App: AppSlice.reducer,
	Session: SessionSlice.reducer,
	Decisions: DecisionsSlice.reducer,
	OptionsAndCriteria: OptionsAndCriteriaSlice.reducer,
	WeightedCriteria: WeightedCriteriaSlice.reducer,
	RatedOptions: RatedOptionsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
