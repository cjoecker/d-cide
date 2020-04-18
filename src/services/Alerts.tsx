import React from "react";

export type AlertType = {
	type: AlertTypes;
	allowClose: boolean;
	autoHide: boolean;
	text: string;
};

export enum AlertTypes {
	error = "error",
	warning = "warning",
	info = "info",
	success = "success",
}

export const AlertInitialState: AlertType = {
	type: AlertTypes.error,
	allowClose: true,
	autoHide: false,
	text: "",
};

//ERRORS
export const HTTP_ERROR: AlertType = {
	type: AlertTypes.error,
	allowClose: true,
	autoHide: false,
	text: "",
};

//WARNINGS
export const NOT_ENOUGH_OPTIONS: AlertType = {
	type: AlertTypes.warning,
	allowClose: false,
	autoHide: false,
	text: "At least two decision options are necessary! ",
};

export const NOT_ENOUGH_CRITERIA: AlertType = {
	type: AlertTypes.warning,
	allowClose: false,
	autoHide: false,
	text: "At least two selection criteria are necessary! ",
};
