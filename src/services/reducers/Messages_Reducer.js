import {SHOW_MESSAGE, DELETE_MESSAGE} from "../actions/types";

const initialState = [

];

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_MESSAGE:
            return state.some(message => message === action.payload) ?
                state
                :
                [action.payload, ...state];

        case DELETE_MESSAGE:
            return state.filter(message => message !== action.payload);

        default:
            return state;
    }
}
