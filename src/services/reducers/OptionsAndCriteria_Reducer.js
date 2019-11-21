import { GET_ITEMS, CREATE_ITEM, DELETE_ITEM, EDIT_ITEM} from "../actions/types";

const initialState = {
    optionsAndCriteria: {},
    decisionOption: [],
    selectionCriteria: []
};

export default function(state = initialState, action) {
    switch (action.type) {

        case GET_ITEMS:
            return {
                ...state,
                [action.itemsKey]: action.payload
            };

        case CREATE_ITEM:
            return {
                ...state,
                [action.itemsKey]: [action.payload, ...state[action.itemsKey]]
            };

        case DELETE_ITEM:
            return {
                ...state,
                [action.itemsKey]: state[action.itemsKey].filter(item => item.id !== action.payload)
            };

        case EDIT_ITEM:
            return {
                ...state
            };

        default:
            return state;
    }
}