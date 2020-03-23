import {
  GET_DECISION_OPTIONS,
  POST_DECISION_OPTION,
  DELETE_DECISION_OPTION,
  PUT_DECISION_OPTION,
} from "../actions/types";
import {
  GET_SELECTION_CRITERIA,
  POST_SELECTION_CRITERIA,
  DELETE_SELECTION_CRITERIA,
  PUT_SELECTION_CRITERIA,
} from "../actions/types";

const initialState = {
  optionsAndCriteria: {},
  decisionOptions: [],
  selectionCriteria: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DECISION_OPTIONS:
      return {
        ...state,
        decisionOptions: action.payload,
      };

    case POST_DECISION_OPTION:
      return {
        ...state,
        decisionOptions: [action.payload, ...state.decisionOptions],
      };

    case DELETE_DECISION_OPTION:
      return {
        ...state,
        decisionOptions: state.decisionOptions.filter(
          (item) => item.id !== action.payload
        ),
      };

    case PUT_DECISION_OPTION:
      return {
        ...state,
      };

    case GET_SELECTION_CRITERIA:
      return {
        ...state,
        selectionCriteria: action.payload,
      };

    case POST_SELECTION_CRITERIA:
      return {
        ...state,
        selectionCriteria: [action.payload, ...state.selectionCriteria],
      };

    case DELETE_SELECTION_CRITERIA:
      return {
        ...state,
        selectionCriteria: state.selectionCriteria.filter(
          (item) => item.id !== action.payload
        ),
      };

    case PUT_SELECTION_CRITERIA:
      return {
        ...state,
      };

    default:
      return state;
  }
}
