import {POST_SESSION, POST_USER, SAVE_JWT, DELETE_JWT} from "../actions/types";


const initialState = {
    validToken: false,
    signUpSuccessful: false,
    jwt: "",
    user: {},
};

export default function(state = initialState, action) {

    switch (action.type) {
        case POST_SESSION:
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
        case POST_USER:
            return {
                ...state,
                signUpSuccessful: action.payload
            };
        default:
            return state;
    }
}