import {
  GET_WEIGHTED_CRITERIA,
  PUT_WEIGHTED_CRITERIA,
  POST_CRITERIA,
} from "../actions/types";

const initialState = {
  weightCriteria: [],
  weightedCriteria: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WEIGHTED_CRITERIA:
      return {
        ...state,
        weightedCriteria: action.payload,
      };

    case PUT_WEIGHTED_CRITERIA:
      return {
        ...state,
      };

    default:
      return state;
  }
}
