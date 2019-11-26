import {
    GET_DECISIONS,
    CREATE_DECISION,
    DELETE_DECISION,
    EDIT_DECISION,
    CREATE_EXAMPLE_DATA,
    TRANSFER_DECISION_TO_USER,
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

        case CREATE_DECISION:
            return {
                ...state,
                decisions: [action.payload, ...state.decisions]
            };

        case DELETE_DECISION:
            return {
                ...state,
                decisions: state.decisions.filter(decision => decision.id !== action.payload)
            };

        case EDIT_DECISION:
            return {
                ...state
            };

        case CREATE_EXAMPLE_DATA:
            return {
                ...state
            };
        case TRANSFER_DECISION_TO_USER:
            return {
                ...state
            };

        default:
            return state;
    }
}