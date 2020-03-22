import {
    POST_SESSION,
    POST_USER,
    SAVE_TOKEN,
    DELETE_TOKEN,
} from "../actions/types";
import {SessionActionTypes} from "../actions/Sessions_Action";

//TODO: remove valid token and use user instead
export class Session {
    validToken: boolean = false;
    signUpSuccessful: boolean = false;
    wrongPassword: boolean = false;
    token: string = "";
    tokenExpirationDate: number = 0;
    user = new User;
}

export class User {
        id: number = 0;
        username: string = "";
        registeredUser: boolean =false;
        fullName: string = "";
}


export default function (state = new Session, action: SessionActionTypes): Session {

    switch (action.type) {
        case POST_SESSION:
            return {
                ...state,
                validToken: !!action.user,
                user: action.user,
                wrongPassword: false,
            };
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case DELETE_TOKEN:
            return {
                ...state,
                token: ""
            };
        case POST_USER:
            return {
                ...state,
                signUpSuccessful: action.signUpSuccessful,
            };
        default:
            return state;
    }
}