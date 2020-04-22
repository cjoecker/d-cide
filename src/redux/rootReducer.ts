import { combineReducers } from "@reduxjs/toolkit";
import AppSlice from "./actionsAndSlicers/AppSlice";
import SessionSlice from "./actionsAndSlicers/SessionSlice";
import OptionsAndCriteriaSlice from "./actionsAndSlicers/OptionsAndCriteriaSlice";
import DecisionsSlice from "./actionsAndSlicers/DecisionsSlice";
import WeightedCriteriaSlice from "./actionsAndSlicers/WeightCriteriaSlice";
import RatedOptionsSlice from "./actionsAndSlicers/RatedOptionsSlice";

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
