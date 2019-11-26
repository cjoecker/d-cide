import { combineReducers } from "redux";
import app_Reducer from "./App_Reducer";
import OptionsAndCriteria_Reducer from "./OptionsAndCriteria_Reducer";
import WeightCriteria_Reducer from "./WeightCriteria_Reducer";
import RateOptions_Reducer from "./RateOptions_Reducer";
import Result_Reducer from "./Result_Reducer";
import Errors_Reducer from "./Errors_Reducer";
import Security_Reducer from "./Security_Reducer";
import Projects_Reducer from "./Decisions_Reducer";

export default combineReducers({
    app: app_Reducer,
    project: Projects_Reducer,
    optionsAndCriteria: OptionsAndCriteria_Reducer,
    weightCriteria: WeightCriteria_Reducer,
    rateOptions: RateOptions_Reducer,
    result: Result_Reducer,
    security: Security_Reducer,
    errors: Errors_Reducer
});