export enum AlertTypes {
	error = 'error',
	warning = 'warning',
	info = 'info',
	success = 'success',
}


export type AlertType = {
	type: AlertTypes;
	allowClose: boolean;
	autoHide: boolean;
	text: string;
};

export const AlertInitialState: AlertType = {
	type: AlertTypes.error,
	allowClose: true,
	autoHide: false,
	text: '',
};

//WARNINGS
export const NOT_ENOUGH_OPTIONS: AlertType = {
	type: AlertTypes.warning,
	allowClose: false,
	autoHide: false,
	text: 'At least two decision options are necessary! ',
};

export const NOT_ENOUGH_CRITERIA: AlertType = {
	type: AlertTypes.warning,
	allowClose: false,
	autoHide: false,
	text: 'At least two selection criteria are necessary! ',
};
