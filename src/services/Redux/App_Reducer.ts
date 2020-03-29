import {AppActionTypes} from "./App_Actions";
import {Reducer} from "redux";
import {DispatchAction} from "./store";


export class AppState {
    isLoading: number = 0;
}


export const App_Reducer: Reducer<AppState, DispatchAction> = (state = new AppState(), action) => {
    switch (action.type) {
        case AppActionTypes.startLoading:
            return {
                ...state,
                isLoading: state.isLoading + 1,
            };
        case AppActionTypes.endLoading:
            return {
                ...state,
                isLoading: state.isLoading - 1,
            };
        default:
            return state;
    }
};

