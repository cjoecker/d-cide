import { START_LOADING, END_LOADING,} from "../actions/types";

const initialState = {
    app: [],
    isLoading: 0,
    isFetchingDataPackage:0,
};

export default function(state = initialState, action) {
    switch (action.type) {

        case START_LOADING:
            return {
                ...state,
                isLoading: state.isLoading + 1
            };

        case END_LOADING:
            return {
                ...state,
                isLoading: state.isLoading - 1
            };
        default:
            return state;
    }
}