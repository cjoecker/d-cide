import {Action, Dispatch, Reducer} from "redux";






export type AppActionsTypes =
	| ReturnType<typeof startLoading>
	| ReturnType<typeof endLoading>;

export const startLoading = () =>
	({
		type: "START_LOADING",
	} as const);

export const endLoading = () =>
	({
		type: "END_LOADING",
	} as const);







export enum ActionType {
	StartLoading,
	EndLoading,
}

export class AppState {
	isLoading: number = 0;
}

export const InitialState: AppState = new AppState();


export interface DispatchAction extends Action {
	payload: Partial<AppState>;
}

export class RootDispatcher {

	private readonly dispatch: Dispatch<DispatchAction>;

	constructor(dispatch: Dispatch<DispatchAction>){
		this.dispatch = dispatch;
	}

	startLoading = (    ) => {

		this.dispatch({type: ActionType.StartLoading, payload: {}});
	}
}


export const App_Reducer: Reducer<AppState, DispatchAction> = (state = InitialState, action) => {

	switch (action.type) {
		case ActionType.StartLoading:
			return {
				...state,
				isLoading: state.isLoading + 1,
			};

		case ActionType.EndLoading:
			return {
				...state,
				isLoading: state.isLoading - 1,
			};

		default:
			return state;
	}
};
