import {GET_OPTIONS, POST_OPTIONS} from "../actions/types";

const initialState = {
    rateOptions: [],
    ratedCriteria: []
};

export default function(state = initialState, action) {
    switch (action.type) {

        case GET_OPTIONS:
            return {
                ...state,
                ratedCriteria: action.payload
            };

        case POST_OPTIONS:
            return {
                ...state
            };

        default:
            return state;
    }
}