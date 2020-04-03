import { combineReducers } from '@reduxjs/toolkit'
import AppSlice from "./AppSlice";
import DecisionsSlice from "./Decisions_Reducer";

// import {Session_Reducer} from "./Session_Reducer";
// import {Decisions_Reducer} from "./Decisions_Reducer";


const rootReducer = combineReducers({
  App: AppSlice.reducer,
  // Session: DecisionsSlice.reducer,
  Decisions: DecisionsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
