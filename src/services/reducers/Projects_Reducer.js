import {
    GET_PROJECTS,
    CREATE_PROJECT,
    DELETE_PROJECT,
    EDIT_PROJECT,
    CREATE_EXAMPLE_DATA,
    TRANSFER_PROJECT_TO_USER,
} from "../actions/types";

const initialState = {
    projects: [],
    project: {}
};

export default function(state = initialState, action) {
    switch (action.type) {

        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };

        case CREATE_PROJECT:
            return {
                ...state,
                projects: [action.payload, ...state.projects]
            };

        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload)
            };

        case EDIT_PROJECT:
            return {
                ...state
            };

        case CREATE_EXAMPLE_DATA:
            return {
                ...state
            };
        case TRANSFER_PROJECT_TO_USER:
            return {
                ...state
            };

        default:
            return state;
    }
}