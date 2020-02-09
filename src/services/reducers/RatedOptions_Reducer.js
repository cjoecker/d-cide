import {GET_RATED_OPTIONS, POST_RATED_OPTIONS} from "../actions/types";

const initialState = {
    rateOptions: [],
    ratedCriteria: []
};

export default function(state = initialState, action) {
    switch (action.type) {

        case GET_RATED_OPTIONS:
            return {
                ...state,
                ratedCriteria: action.payload
            };

        case POST_RATED_OPTIONS:
            return {
                ...state
            };

        default:
            return state;
    }
}