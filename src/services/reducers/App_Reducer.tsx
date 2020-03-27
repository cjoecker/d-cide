import {ActionType, AppActionsTypes} from "../actions/App_Actions";


export class AppState {
    isLoading: number = 0;
}

export function App_Reducer(
    state = new AppState(),
    action: AppActionsTypes
): AppState{
    switch (action.type) {
        case ActionType.StartLoading:
            return {
                ...state,
                isLoading: state.isLoading + 1,
            };
        case ActionType.EndLoading:
            return {
                ...state,
                isLoading: state.isLoading - 1,
            };
        default:
            return state;
    }
};

