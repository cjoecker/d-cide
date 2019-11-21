import { START_LOADING, END_LOADING,START_FETCHING_DATA_PACKAGE, END_FETCHING_DATA_PACKAGE} from "../actions/types";

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
        case START_FETCHING_DATA_PACKAGE:
            return {
                ...state,
                isFetchingDataPackage: state.isFetchingDataPackage + 1
            };

        case END_FETCHING_DATA_PACKAGE:
            return {
                ...state,
                isFetchingDataPackage: state.isFetchingDataPackage - 1
            };
        default:
            return state;
    }
}