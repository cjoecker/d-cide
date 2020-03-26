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
import {AppState, DispatchAction, App_Reducer, InitialState} from "./reducers/App_Reducer";



// const rootReducer = combineReducers({
//     App_Reducer,
//     decisions: Decisions_Reducer,
//     optionsAndCriteria: OptionsAndCriteria_Reducer,
//     weightCriteria: WeightCriteria_Reducer,
//     rateOptions: RatedOptions_Reducer,
//     sessions: Sessions_Reducer,
//     alerts: Alerts_Reducer,
//     errors: Errors_Reducer,
// });

// export type AppState = ReturnType<typeof rootReducer>;
//
export type AppActions =
    | SessionsActionsTypes
    | AlertsActionsTypes
    | AppActionsTypes;




// const initialState = {};
const middleware = thunk as ThunkMiddleware<AppState, AppActions>;
let store;

const ReduxDevTools =
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
	(window as any).__REDUX_DEVTOOLS_EXTENSION__();


if (window.navigator.userAgent.includes("Chrome") && ReduxDevTools) {

    store = createStore(
        App_Reducer,
        InitialState,
        compose(applyMiddleware(middleware), ReduxDevTools)
    );

} else {
    store = createStore(
        App_Reducer,
        InitialState,
        compose(applyMiddleware(middleware))
    );
}

export default store;


