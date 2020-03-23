import { combineReducers } from "redux";
import app_Reducer from "./App_Reducer";
import OptionsAndCriteria_Reducer from "./OptionsAndCriteria_Reducer";
import WeightCriteria_Reducer from "./WeightCriteria_Reducer";
import RateOptions_Reducer from "./RatedOptions_Reducer";
import Alerts_Reducer from "./Alerts_Reducer";
import Errors_Reducer from "./Errors_Reducer";
import Security_Reducer from "./Sessions_Reducer";
import Decisions_Reducer from "./Decisions_Reducer";
import {SessionsActionsTypes} from "../actions/Sessions_Actions";

export const rootReducer = combineReducers({
  app: app_Reducer,
  decision: Decisions_Reducer,
  optionsAndCriteria: OptionsAndCriteria_Reducer,
  weightCriteria: WeightCriteria_Reducer,
  rateOptions: RateOptions_Reducer,
  security: Security_Reducer,
  alerts: Alerts_Reducer,
  errors: Errors_Reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export type AppActions = SessionsActionsTypes;
