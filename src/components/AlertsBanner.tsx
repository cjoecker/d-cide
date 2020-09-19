import React, {useEffect, useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@material-ui/core';
import {AlertInitialState, AlertType, AlertTypes} from '../constants/Alerts';
import {RootState} from '../services/redux/rootReducer';
import AppSlice from '../services/redux/actionsAndSlicers/AppSlice';

const AlertsBanner: React.FC = () => {
	const {alerts} = useSelector((state: RootState) => state.App, shallowEqual);

	const [autoHideSecsNum, setAutoHideSecsNum] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const [alert, setAlert] = useState(AlertInitialState);

	const dispatch = useDispatch();
	const theme = useTheme();

	useEffect(() => {
		if (alerts[0] != null && alerts[0].text !== '') {
			setAlert(sortAlerts(alerts));
			setAutoHideSecsNum(calculateHideTime(alerts[0]));
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	}, [alerts]);

	const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setIsVisible(false);

		dispatch(AppSlice.actions.deleteAlert(alert));
	};

	const calculateHideTime = (alertLocal: AlertType) => {
		if (!alertLocal.autoHide) return 0;

		const matches = String(alertLocal.text).match(/[\w\d’-]+/gi);
		const wordsNum = matches ? matches.length : 0;

		//200 Words per minute
		return (wordsNum / 3.3) * 1500;
	};

	const sortAlerts = (_alerts: AlertType[]) => {
		const errors = _alerts.filter(_alert => _alert.type === AlertTypes.error);
		if (errors.length > 0) {
			return errors[0];
		}

		const warning = _alerts.filter(filteredAlert => filteredAlert.type === AlertTypes.warning);
		if (warning.length > 0) {
			return warning[0];
		}

		const success = _alerts.filter(filteredAlert => filteredAlert.type === AlertTypes.success);
		if (success.length > 0) {
			return success[0];
		}

		const info = _alerts.filter(filteredAlert => filteredAlert.type === AlertTypes.info);
		if (info.length > 0) {
			return info[0];
		}

		return _alerts[0];
	};

	return (
		<div>
			<Snackbar
				open={isVisible}
				autoHideDuration={autoHideSecsNum !== 0 ? autoHideSecsNum : undefined}
				onClose={handleClose}
			>
				<Alert
					style={{marginBottom: theme.spacing(1)}}
					data-testid={`${alert.type}Alert`}
					onClose={alert.allowClose ? handleClose : undefined}
					severity={alert.type}
				>
					{alert.text}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default AlertsBanner;
