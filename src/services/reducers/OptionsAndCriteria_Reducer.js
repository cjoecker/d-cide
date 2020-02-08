import { GET_ITEMS, POST_ITEM, DELETE_ITEM, PUT_ITEM} from "../actions/types";

const initialState = {
    optionsAndCriteria: {},
    decisionOptions: [],
    selectionCriteria: []
};

export default function(state = initialState, action) {
    switch (action.type) {

        case GET_ITEMS:
            return {
                ...state,
                [action.itemsKey]: action.payload
            };

        case POST_ITEM:
            return {
                ...state,
                [action.itemsKey]: [action.payload, ...state[action.itemsKey]]
            };

        case DELETE_ITEM:
            return {
                ...state,
                [action.itemsKey]: state[action.itemsKey].filter(item => item.id !== action.payload)
            };

        case PUT_ITEM:
            return {
                ...state
            };

        default:
            return state;
    }
}