import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AlertInitialState, AlertType, AlertTypes } from "../services/Alerts";
import { RootState } from "../services/redux/rootReducer";
import AppSlice from "../services/redux/actionsAndSlicers/AppSlice";

const AlertsBanner: React.FC = () => {
	const {alerts} = useSelector((state: RootState) => state.App, shallowEqual);

	const [autoHideTime, setAutoHideTime] = useState(0);
	const [open, setOpen] = useState(false);
	const [alert, setAlert] = useState(AlertInitialState);

	const dispatch = useDispatch();

	useEffect(() => {
		if (alerts[0] != null && alerts[0].text !== '') {
			setAlert(sortAlerts(alerts));
			setAutoHideTime(calculateHideTime(alerts[0]));
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [alerts]);

	const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);

		dispatch(AppSlice.actions.deleteAlert(alert));
	};

	const calculateHideTime = (alertLocal: AlertType) => {
		if (!alertLocal.autoHide) return 0;

		const matches = String(alertLocal.text).match(/[\w\d’-]+/gi);
		const wordsNum = matches ? matches.length : 0;

		//200 Words per minute
		return (wordsNum / 3.3) * 1500;
	};

	const sortAlerts = (localAlerts: AlertType[]) => {
		const errors = localAlerts.filter(filteredAlert => filteredAlert.type === AlertTypes.error);
		if (errors.length > 0) {
			return errors[0];
		}

		const warning = localAlerts.filter(filteredAlert => filteredAlert.type === AlertTypes.warning);
		if (warning.length > 0) {
			return warning[0];
		}

		const success = localAlerts.filter(filteredAlert => filteredAlert.type === AlertTypes.success);
		if (success.length > 0) {
			return success[0];
		}

		const info = localAlerts.filter(filteredAlert => filteredAlert.type === AlertTypes.info);
		if (info.length > 0) {
			return info[0];
		}

		return localAlerts[0];
	};

	return (
		<div>
			<Snackbar open={open} autoHideDuration={autoHideTime !== 0 ? autoHideTime : undefined} onClose={handleClose}>
				<Alert onClose={alert.allowClose ? handleClose : undefined} variant='filled' severity={alert.type}>
					{alert.text}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default AlertsBanner;
