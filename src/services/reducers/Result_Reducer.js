import { GET_RESULT} from "../actions/types";

const initialState = {
    result: {},
    decisionOption: [],
    selectionCriteria: []
};

export default function(state = initialState, action) {

    switch (action.type) {

        case GET_RESULT:
            return {
                ...state,
                [action.itemsKey]: action.payload
            };
        default:
            return state;
    }
}