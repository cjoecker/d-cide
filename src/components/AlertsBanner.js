import React, { Component } from "react";
import PropTypes from "prop-types";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import amber from "@material-ui/core/colors/amber";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { green } from "@material-ui/core/colors";
import ReactGA from "react-ga";
import { connect } from "react-redux";
import { deleteAlert } from "../services/actions/Alerts_Actions";
import Alert from "@material-ui/lab/Alert";

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

class AlertsBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actualAlert: "",
      open: false,
      autoHideTime: 0,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.alerts !== this.props.alerts) {
      this.setAlert(this.filterAlerts(this.props.alerts));
    }
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });

    this.props.deleteAlert(this.state.actualAlert);
  };

  calculateHideTime(alert) {
    const matches = String(alert).match(/[\w\d’-]+/gi);
    const wordsNum = matches ? matches.length : 0;

    //200 Words per minute
    const autoHideTime = (wordsNum / 3.3) * 1000;

    this.setState({ autoHideTime: autoHideTime });
  }

  filterAlerts(alerts) {
    let alert;
    let errors;
    let warnings;

    errors = alerts.filter((alert) => alert.type === "error");

    if (errors.length > 0) {
      alert = errors[0];
    } else {
      warnings = alerts.filter((alert) => alert.type === "warning");
      if (warnings.length > 0) {
        alert = warnings[0];
      }
    }
    return alert;
  }

  setAlert(alert) {
    if (alert !== undefined && alert !== null) {
      this.calculateHideTime(alert.text);
      this.setState({
        actualAlert: alert,
        open: true,
      });

      ReactGA.event({
        category: "Alert Banner",
        action: `${alert.type}: ${alert.text}`,
      });
    } else {
      this.setState({
        open: false,
        //don`t reset actual alert
      });
    }
  }

  render() {
    const autoHide = this.props.autoHide ? this.state.autoHideTime : null;

    return (
      <div>
        <Snackbar open={this.state.open} autoHideDuration={autoHide}>
          <Alert
            onClose={
              this.state.actualAlert.allowDelete ? this.handleClose : null
            }
            variant="filled"
            severity={this.state.actualAlert.type}
          >
            {this.state.actualAlert.text}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

AlertsBanner.propTypes = {
  classes: PropTypes.object.isRequired,
  alerts: PropTypes.object.isRequired,
  deleteAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { deleteAlert })(
  withStyles(styles)(AlertsBanner)
);
