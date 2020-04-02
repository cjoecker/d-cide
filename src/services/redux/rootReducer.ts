import { combineReducers } from '@reduxjs/toolkit'
import AppSlice from "./AppSlice";

// import {Session_Reducer} from "./Session_Reducer";
// import {Decisions_Reducer} from "./Decisions_Reducer";


const rootReducer = combineReducers({
  App: AppSlice.reducer,
  // Session: Session_Reducer,
  // Decisions: Decisions_Reducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
