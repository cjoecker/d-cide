import { GET_RATED_OPTIONS, PUT_RATED_OPTION } from "../actions/types";

const initialState = {
  rateOptions: [],
  ratedCriteria: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RATED_OPTIONS:
      return {
        ...state,
        ratedCriteria: action.payload,
      };

    case PUT_RATED_OPTION:
      return {
        ...state,
      };

    default:
      return state;
  }
}
