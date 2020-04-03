import { combineReducers } from '@reduxjs/toolkit'
import AppSlice from "./AppSlice";
import DecisionsSlice from "./DecisionsSlice";
import SessionSlice from "./SessionSlice";


const rootReducer = combineReducers({
  App: AppSlice.reducer,
  Session: SessionSlice.reducer,
  Decisions: DecisionsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
