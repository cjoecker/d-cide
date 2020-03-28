import {AppActionsTypes} from "../actions/App_Actions";


export class AppState {
    isLoading: number = 0;
}

export function App_Reducer(
    state = new AppState(),
    action: AppActionsTypes
): AppState{
    switch (action) {
        case AppActionsTypes.StartLoading:
            return {
                ...state,
                isLoading: state.isLoading + 1,
            };
        case AppActionsTypes.EndLoading:
            return {
                ...state,
                isLoading: state.isLoading - 1,
            };
        default:
            console.log(action);
            return state;
    }
};

