import { Session, User } from "./Session";
import { SessionActionTypes } from "../actions/Sessions_Action";

// export const POST_SESSION = "POST_SESSION";
// export const POST_USER = "POST_USER";
// export const SAVE_TOKEN = "SAVE_TOKEN";
// export const DELETE_TOKEN = "DELETE_TOKEN";
//
// export interface PostSessionAction {
//     type: typeof POST_SESSION;
//     user: User;
// }
//
// export interface PostUserAction {
//     type: typeof POST_USER;
//     signUpSuccessful: boolean;
// }
//
// export interface SaveTokenAction {
//     type: typeof SAVE_TOKEN;
//     token: string;
// }
//
// export interface SaveTokenAction {
//     type: typeof SAVE_TOKEN;
//     token: string;
// }
//
// export interface DeleteTokenAction {
//     type: typeof DELETE_TOKEN;
// }
//
// export type SessionActionTypes = PostSessionAction | PostUserAction | SaveTokenAction | DeleteTokenAction;

export type AppActions = SessionActionTypes;
