import {SessionActionTypes} from "./Sessions_Actions";
import {Reducer} from "redux";
import {DispatchAction} from "./store";
import {AppState} from "./App_Reducer";

//TODO: remove valid token and use user instead
export class SessionState {
	validToken: boolean = false;
	signUpSuccessful: boolean = false;
	wrongPassword: boolean = false;
	token: string = "";
	tokenExpirationDate: number = 0;
	user? = new User();
}

export class User {
	id: number = 0;
	username: string = "";
	registeredUser: boolean = false;
	fullName: string = "";
}

//TODO set token expiration date
export const Session_Reducer: Reducer<SessionState, DispatchAction> = (state = new SessionState(), action) => {
	switch (action.type) {
		case SessionActionTypes.setSession:
			return {
				...state,
				validToken: !!action.payload.user || false,
				user: action.payload.user || new User(),
				token: action.payload.token || '',
				wrongPassword: false,
			};
		case SessionActionTypes.setToken:
			return {
				...state,
				token: action.payload.token || '',
			};
		case SessionActionTypes.setSignUpSuccessful:
			return {
				...state,
				signUpSuccessful: action.payload.signUpSuccessful || false,
			};
		case SessionActionTypes.setWrongPassword:
			return {
				...state,
				wrongPassword: action.payload.wrongPassword || false,
			};
		default:
			return state;
	}
}
