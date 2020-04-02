import { combineReducers } from '@reduxjs/toolkit'
import {App_Reducer} from "./App_Reducer";
import {Session_Reducer} from "./Session_Reducer";
import {Decisions_Reducer} from "./Decisions_Reducer";


const rootReducer = combineReducers({
  App: App_Reducer,
  Session: Session_Reducer,
  Decisions: Decisions_Reducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
