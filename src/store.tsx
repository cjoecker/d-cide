import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import {AppActions, AppState} from "./services/reducers";
import app_Reducer from "./services/reducers/App_Reducer";
import Decisions_Reducer from "./services/reducers/Decisions_Reducer";
import OptionsAndCriteria_Reducer from "./services/reducers/OptionsAndCriteria_Reducer";
import WeightCriteria_Reducer from "./services/reducers/WeightCriteria_Reducer";
import RateOptions_Reducer from "./services/reducers/RatedOptions_Reducer";
import Security_Reducer from "./services/reducers/Sessions_Reducer";
import Alerts_Reducer from "./services/reducers/Alerts_Reducer";
import Errors_Reducer from "./services/reducers/Errors_Reducer";
import {SessionsActionsTypes} from "./services/actions/Sessions_Actions";
import {AlertsActionsTypes} from "./services/actions/Alerts_Actions";
import {AppActionsTypes} from "./services/actions/App_Actions";

const rootReducer = combineReducers({
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

export type AppActions =
    | SessionsActionsTypes
    | AlertsActionsTypes
    | AppActionsTypes;

const initialState = {};
const middleware = thunk as ThunkMiddleware<AppState, AppActions>;
let store;



const ReactReduxDevTools =
    window && (window as any).__REDUX_DEVTOOLS_EXTENSION__() &&
    window && (window as any).__REDUX_DEVTOOLS_EXTENSION__;

if (window.navigator.userAgent.includes("Chrome") && ReactReduxDevTools) {
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(middleware), ReactReduxDevTools)
    );
} else {
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(middleware))
    );
}

export default store;
