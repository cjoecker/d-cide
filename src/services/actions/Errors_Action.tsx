import { SET_ERRORS } from "./types";

export const showAlert = (error) => async (dispatch) => {
	dispatch({
		type: SET_ERRORS,
		payload: error,
	});
};
