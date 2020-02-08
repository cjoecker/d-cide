import {
    GET_DECISIONS,
    POST_DECISION,
    DELETE_DECISION,
    PUT_DECISION,
} from "../actions/types";

const initialState = {
    decisions: [],
    decision: {}
};

export default function(state = initialState, action) {
    switch (action.type) {

        case GET_DECISIONS:
            return {
                ...state,
                decisions: action.payload
            };

        case POST_DECISION:
            return {
                ...state,
                decisions: [action.payload, ...state.decisions]
            };

        case DELETE_DECISION:
            return {
                ...state,
                decisions: state.decisions.filter(decision => decision.id !== action.payload)
            };

        case PUT_DECISION:
            return {
                ...state
            };
        default:
            return state;
    }
}