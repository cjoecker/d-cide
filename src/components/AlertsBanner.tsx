import React, {useEffect, useState} from "react";
import amber from "@material-ui/core/colors/amber";
import Snackbar from "@material-ui/core/Snackbar";
import {withStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import Alert from "@material-ui/lab/Alert";
import {WithStyles} from "@material-ui/core/styles";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AlertClass, AlertTypes} from "../services/Alerts";

const styles = (theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[600],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    alert: {
        display: "flex",
        alignItems: "center",
    },
});

interface Props extends WithStyles<typeof styles> {
}

const AlertsBanner: React.FC<Props> = (props: Props) => {

    const dispatch = useDispatch();

    const {Alerts} = useSelector(state => state.App, shallowEqual);

    const [autoHideTime, setAutoHideTime] = useState(0);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(new AlertClass());

    useEffect(() => {
        console.log(Alerts);

        if (Alerts[0] !== undefined && Alerts[0].text !== "") {
            setAlert(sortAlerts(Alerts));
            setAutoHideTime(calculateHideTime(Alerts[0]));
            //TODO this needs to be taken out to other function to avoid async issues
            setOpen(true);
        } else {
            setAlert(new AlertClass());
            setAutoHideTime(0);
            setOpen(false);
        }
    }, [Alerts]);


    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

        //TODO delete alert dispatch
        // this.props.deleteAlert(this.state.actualAlert);
    };

    const calculateHideTime = (alertLocal: AlertClass) => {

        if (!alertLocal.autoHide)
            return 0;

        const matches = String(alertLocal.text).match(/[\w\d’-]+/gi);
        const wordsNum = matches ? matches.length : 0;

        //200 Words per minute
        return (wordsNum / 3.3) * 1500;
    };

    const sortAlerts = (alerts: AlertClass[]) => {

        const errors = alerts.filter((alert) => alert.type === AlertTypes.error);
        if (errors.length > 0) {
            return errors[0];
        }

        const warning = alerts.filter((alert) => alert.type === AlertTypes.warning);
        if (warning.length > 0) {
            return warning[0];
        }

        const success = alerts.filter((alert) => alert.type === AlertTypes.success);
        if (success.length > 0) {
            return success[0];
        }

        const info = alerts.filter((alert) => alert.type === AlertTypes.info);
        if (info.length > 0) {
            return info[0];
        }

        return alerts[0];

    };


    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={autoHideTime !== 0 ? autoHideTime : undefined}
                onClose={handleClose}>
                <Alert
                    onClose={alert.allowDelete ? handleClose : undefined}
                    variant="filled"
                    severity={alert.type}
                >
                    {alert.text}
                </Alert>
            </Snackbar>
        </div>
    );

};

export default withStyles(styles)(AlertsBanner);
