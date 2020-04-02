import { Reducer } from "redux";
// import { DispatchAction } from "./store";
import { DecisionsActionTypes } from "./Decisions_Action";
import { removeObjectsFromArray } from "../GeneralUtils";

export class DecisionsState {
	decisions: Decision[] = [];
}

class Decision {
	id: number = 0;
	name: string = "";
}

// export const Decisions_Reducer: Reducer<DecisionsState, DispatchAction> = (
// 	state = new DecisionsState(),
// 	action
// ) => {
// 	switch (action.type) {
// 		case DecisionsActionTypes.setDecisions:
// 			return {
// 				...state,
// 				decisions: action.payload.decisions || [],
// 			};
// 		case DecisionsActionTypes.addDecision:
// 			return {
// 				...state,
// 				decisions: [...(action.payload.decisions || []), ...state.decisions],
// 			};
// 		case DecisionsActionTypes.deleteDecision:
// 			return {
// 				...state,
// 				decisions: removeObjectsFromArray(state.decisions, [
// 					...(action.payload.decisions || []),
// 				]),
// 			};
// 		case DecisionsActionTypes.updateDecision:
// 			return {
// 				...state,
// 			};
// 		default:
// 			return state;
// 	}
// };
