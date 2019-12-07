import {SET_USER, SIGNUP_SUCCESSFUL, SAVE_JWT, DELETE_JWT} from "../actions/types";

const initialState = {
    validToken: false,
    signUpSuccessful: false,
    jwt: "",
    user: {},
};

export default function(state = initialState, action) {

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                validToken: !!action.payload,
                user: action.payload
            };
        case SAVE_JWT:
            return {
                ...state,
                jwt: action.payload
            };
        case DELETE_JWT:
            return {
                ...state,
                jwt: ""
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