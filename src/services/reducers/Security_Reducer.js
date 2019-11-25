import {GET_UNREGISTERED_USERS, SET_CURRENT_USER, SIGNUP_SUCCESSFUL} from "../actions/types";

const initialState = {
    validToken: false,
    signUpSuccessful: false,
    user: {},
};

export default function(state = initialState, action) {

    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: !!action.payload,
                user: action.payload
            };
        case GET_UNREGISTERED_USERS:
            return {
                ...state,
                validToken: !!action.payload,
                user: action.payload
            };
        case SIGNUP_SUCCESSFUL:
            return {
                ...state,
                signUpSuccessful: action.payload
            };
        default:
            return state;
    }
}