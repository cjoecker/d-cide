import { AppActionsTypes} from "../actions/App_Actions";


export class AppState {
    isLoading: number = 0;
}

export function App_Reducer(
    state = new AppState(),
    action: AppActionsTypes
): AppState{
    switch (action.type) {
        case "START_LOADING":
            return {
                ...state,
                isLoading: state.isLoading + 1,
            };
        case "END_LOADING":
            return {
                ...state,
                isLoading: state.isLoading - 1,
            };
        default:
            return state;
    }
};

