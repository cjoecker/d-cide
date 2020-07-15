import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AlertType} from '../../../constants/Alerts';

type AppState = {
	alerts: AlertType[];
	instructionsSteps: number;
};

const initialState: AppState = {
	alerts: [],
	instructionsSteps: 0,
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
		increaseInstructionsStep(state) {
			state.instructionsSteps += 1;
		},
	},
});

export default AppSlice;
