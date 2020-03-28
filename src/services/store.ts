import {Action, applyMiddleware, combineReducers, compose, createStore,} from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import {AppState, App_Reducer} from "./reducers/App_Reducer";
import {SessionState} from "./reducers/Sessions_Reducer";


const rootReducer = combineReducers({
    App: App_Reducer
});

type rootState = AppState | SessionState;






export interface DispatchAction extends Action {
    payload: Partial<rootState>;
}

const middleware = thunk as ThunkMiddleware<AppState, DispatchAction>;

const ReduxDevTools =
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(
    rootReducer,
    compose(applyMiddleware(middleware),ReduxDevTools)
);




