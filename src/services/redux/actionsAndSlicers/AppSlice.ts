import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AlertType} from '../../../constants/Alerts';

type AppState = {
	alerts: AlertType[];
};

const initialState: AppState = {
	alerts: [],
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
	},
});

export default AppSlice;
