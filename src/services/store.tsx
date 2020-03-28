import {Action, applyMiddleware, combineReducers, compose, createStore, Reducer} from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import {SessionsActionsTypes} from "./actions/Sessions_Actions";
import {AlertsActionsTypes} from "./actions/Alerts_Actions";
import {AppActionsTypes} from "./actions/App_Actions";
import WeightCriteria_Reducer from "./reducers/WeightCriteria_Reducer";
import OptionsAndCriteria_Reducer from "./reducers/OptionsAndCriteria_Reducer";
import Decisions_Reducer from "./reducers/Decisions_Reducer";
import RatedOptions_Reducer from "./reducers/RatedOptions_Reducer";
import Sessions_Reducer from "./reducers/Sessions_Reducer";
import Alerts_Reducer from "./reducers/Alerts_Reducer";
import Errors_Reducer from "./reducers/Errors_Reducer";
import {AppState, App_Reducer} from "./reducers/App_Reducer";

const rootReducer = combineReducers({
    App: App_Reducer
});

export type AppActions =
    | SessionsActionsTypes
    | AlertsActionsTypes
    | AppActionsTypes;


export interface DispatchAction extends Action {
    payload: Partial<AppState>;
}

const middleware = thunk as ThunkMiddleware<AppState, DispatchAction>;

const ReduxDevTools =
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(
    rootReducer,
    compose(applyMiddleware(middleware),ReduxDevTools)
);


