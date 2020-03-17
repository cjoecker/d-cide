import {SHOW_ALERT, DELETE_ALERT} from "../actions/types";

const initialState = [

];

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_ALERT:
            return state.some(alert => alert === action.payload) ?
                state
                :
                [action.payload, ...state];

        case DELETE_ALERT:
            return state.filter(alert => alert !== action.payload);

        default:
            return state;
    }
}
