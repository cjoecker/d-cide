import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AlertType} from '../../../constants/Alerts';

type AppState = {
	alerts: AlertType[];
	instructionsStepNum: number;
	areInstructionsVisible: boolean;
};

const initialState: AppState = {
	alerts: [],
	instructionsStepNum: 0,
	areInstructionsVisible: true,
};

const AppSlice = createSlice({
	name: 'App',
	initialState,
	reducers: {
		addAlert(state, action: PayloadAction<AlertType>) {
			state.alerts = state.alerts.some(alert => JSON.stringify(alert) === JSON.stringify(action.payload))
				? state.alerts
				: [action.payload, ...state.alerts];
		},
		deleteAlert(state, action: PayloadAction<AlertType>) {
			state.alerts = state.alerts.filter(alert => JSON.stringify(alert) !== JSON.stringify(action.payload));
		},
		goToInstructionsStep(state, action: PayloadAction<number>) {
			state.instructionsStepNum = action.payload;
		},
		setAreInstructionsVisible(state, action: PayloadAction<boolean>) {
			state.areInstructionsVisible = action.payload;
		},
	},
});

export default AppSlice;
