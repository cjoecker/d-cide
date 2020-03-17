import { combineReducers } from "redux";
import app_Reducer from "./App_Reducer";
import OptionsAndCriteria_Reducer from "./OptionsAndCriteria_Reducer";
import WeightCriteria_Reducer from "./WeightCriteria_Reducer";
import RateOptions_Reducer from "./RatedOptions_Reducer";
import Alerts_Reducer from "./Alerts_Reducer";
import Security_Reducer from "./Sessions_Reducer";
import Decisions_Reducer from "./Decisions_Reducer";

export default combineReducers({
    app: app_Reducer,
    decision: Decisions_Reducer,
    optionsAndCriteria: OptionsAndCriteria_Reducer,
    weightCriteria: WeightCriteria_Reducer,
    rateOptions: RateOptions_Reducer,
    security: Security_Reducer,
    alerts: Alerts_Reducer
});