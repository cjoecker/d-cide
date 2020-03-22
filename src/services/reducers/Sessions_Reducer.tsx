import {
    POST_SESSION,
    POST_USER,
    SAVE_TOKEN,
    DELETE_TOKEN,
} from "../actions/types";
import {Session, User} from "../types/Session";
import {SessionActionTypes} from "../types/actions";
import {postSession} from "../actions/Sessions_Action";

//TODO: remove valid token and use user instead
const initialState: Session = {
    validToken: false,
    signUpSuccessful: false,
    wrongPassword: false,
    token: "",
    tokenExpirationDate: 0,
    user: {
        id: 0,
        username: "",
        registeredUser: false,
        fullName: "",
    },
};



export class initialState2 {
    validToken?: boolean = false;
    signUpSuccessful?: boolean = false;
    wrongPassword?: boolean = false;
    token?: string = "";
    tokenExpirationDate?: number = 0;
    user? = user
}

export class user {
        id?: number = 0;
        username?: string = "";
        registeredUser?: boolean =false;
        fullName?: string = "";
}



export default function (state = initialState2, action: SessionActionTypes): initialState2 {

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