import {
	END_LOADING,
	GET_DECISIONS,
	POST_DECISION,
	SHOW_ALERT,
	START_LOADING,
} from "../actions/types";
import { HTTP_ERROR } from "../Alerts";
import axios, {AxiosError} from "axios";
import {ThunkAction} from "redux-thunk";
import {SessionState} from "./Session_Reducer";
import {Action} from "redux";
import {AppActionTypes, showHTTPAlert} from "./App_Actions";
import {SessionActionTypes} from "./Sessions_Actions";
import {rootState} from "./store";


export const httpRequest = (
	requestType,
	path,
	object,
	reduxType,
	payload = null
) => async (dispatch) => {
	//Show Loading Bar
	dispatch({ type: START_LOADING });

	try {
		let response;

		switch (requestType) {
			case "get":
				response = await axios.get(path, object);
				break;
			case "post":
				response = await axios.post(path, object);
				break;
			case "put":
				response = await axios.put(path, object);
				break;
			case "delete":
				response = await axios.delete(path, object);
				break;
		}

		let responseData = payload;

		if (
			response !== undefined &&
			response.data !== undefined &&
			payload == null
		) {
			responseData = response.data;
		}

		dispatch({
			type: reduxType,
			payload: responseData,
		});
	} catch (error) {
		let httpError = HTTP_ERROR;

		httpError.text = `${error.response.statusText} (${error.response.status})`;

		dispatch({
			type: SHOW_ALERT,
			payload: httpError,
		});
	}

	//Show Loading Bar
	dispatch({ type: END_LOADING });
};


