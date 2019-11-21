import {GET_OPTIONS, CHANGE_OPTION, SEND_EVERY_OPTION} from "../actions/types";

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

        case CHANGE_OPTION:
            return {
                ...state
            };

        case SEND_EVERY_OPTION:
            return {
                ...state
            };

        default:
            return state;
    }
}