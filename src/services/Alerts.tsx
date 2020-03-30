import React from "react";


export class AlertClass {
	type: AlertTypes = AlertTypes.error;
	allowDelete: boolean = false;
	autoHide: boolean = false;
	text: string = "";
}

export enum AlertTypes {
	error= "error",
	warning = "warning",
	info = "info",
	success = "success",
}



//ERRORS
export const HTTP_ERROR: AlertClass = {
	type: AlertTypes.error,
	allowDelete: true,
	autoHide: false,
	text: "",
};

//WARNINGS
export const NOT_ENOUGH_OPTIONS: AlertClass = {
	type: AlertTypes.warning,
	allowDelete: false,
	autoHide: false,
	text: "At least two decision options are necessary! ",
};

export const NOT_ENOUGH_CRITERIA: AlertClass = {
	type: AlertTypes.warning,
	allowDelete: false,
	autoHide: false,
	text: "At least two selection criteria are necessary! ",
};
