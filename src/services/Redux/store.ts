import {Action, applyMiddleware, combineReducers, compose, createStore,} from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import {AppState, App_Reducer} from "./App_Reducer";
import Session_Reducer, {SessionState} from "./Session_Reducer";


const rootReducer = combineReducers({
    App: App_Reducer,
    Session: Session_Reducer
});

interface rootState extends
    AppState,
    SessionState
{}





export interface DispatchAction extends Action {
    payload: Partial<rootState>;
}

const middleware = thunk as ThunkMiddleware<rootState, DispatchAction>;

const ReduxDevTools =
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(
    rootReducer,
    compose(applyMiddleware(middleware),ReduxDevTools)
);



