import { HTTP_ERROR } from "../Alerts";
import { Dispatch } from "redux";
import { AxiosError } from "axios";
import AppSlice from "./AppSlice";



export const showHTTPAlert = (dispatch: Dispatch, error: AxiosError) => {

	const httpError = {
		...HTTP_ERROR,
		text: `${error.response?.statusText} (${error.response?.status})`,
	};
	dispatch(AppSlice.actions.addAlert(httpError));
};
