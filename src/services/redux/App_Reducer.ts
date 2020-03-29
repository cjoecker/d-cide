import {Reducer} from "redux";
import {DispatchAction} from "./store";
import {AppActionTypes} from "./App_Actions";
import {Alert} from "../Alerts";


export class AppState {
    isLoading: number = 0;
    Alerts: Alert[] = [];
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
        case AppActionTypes.addAlerts:
            return {
                ...state,
                Alerts: [...[...action.payload.Alerts || []].filter(alert => !state.Alerts.includes(alert)), ...state.Alerts]
            };
        case AppActionTypes.deleteAlerts:
            return {
                ...state,
                Alerts: state.Alerts.filter(alert => ![...action.payload.Alerts || []].includes(alert))
            };
        default:
            return state;
    }
};

