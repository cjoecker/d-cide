import { SessionsActionsTypes } from "../actions/Sessions_Actions";

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

export default function (
	state = new SessionState(),
	action: SessionsActionsTypes
): SessionState {
	switch (action.type) {
		case "SET_SESSION":
			return {
				...state,
				validToken: !!action.user,
				user: action.user,
				token: action.token,
				wrongPassword: false,
			};
		case "SET_TOKEN":
			return {
				...state,
				token: action.token,
			};
		case "POST_USER":
			return {
				...state,
				signUpSuccessful: action.signUpSuccessful,
			};
		case "SET_WRONG_PASSWORD":
			return {
				...state,
				wrongPassword: action.wrongPassword,
			};
		default:
			return state;
	}
}
