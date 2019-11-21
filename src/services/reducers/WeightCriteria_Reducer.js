import {GET_CRITERIA, CHANGE_CRITERIA, SEND_EVERY_CRITERIA} from "../actions/types";

const initialState = {
    weightCriteria: [],
    weightedCriteria: []
};

export default function(state = initialState, action) {
    switch (action.type) {

        case GET_CRITERIA:
            return {
                ...state,
                weightedCriteria: action.payload
            };

        case CHANGE_CRITERIA:
            return {
                ...state
            };

        case SEND_EVERY_CRITERIA:
            return {
                ...state
            };

        default:
            return state;
    }
}