import {Reducer} from "redux";
import {DispatchAction} from "./store";
import {DecisionsActionTypes} from "./Decisions_Action";


export class DecisionsState {
	decisions: Decision[] = [];
}

class Decision{
	id: number = 0;
	name: string = "";
}


export const Decisions_Reducer: Reducer<DecisionsState, DispatchAction> = (state = new DecisionsState(), action) => {
	switch (action.type) {
		case DecisionsActionTypes.setDecisions:
			return {
				...state,
				decisions: action.payload.decisions || [],
			};
		case DecisionsActionTypes.addDecision:
			return {
				...state,
				decisions: [...action.payload.decisions || [], ...state.decisions],
			};
		case DecisionsActionTypes.deleteDecision:
			return {
				...state,
				decisions: state.decisions.filter(
					(decision) => decision.id !== action.payload
				),
			};
		case DecisionsActionTypes.updateDecision:
			return {
				...state,
			};
		default:
			return state;
	}
};

