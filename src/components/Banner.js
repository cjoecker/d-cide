import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import {green} from "@material-ui/core/colors";
import ReactGA from "react-ga";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles1 = theme => ({
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
        backgroundColor: amber[800],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const {classes, className, message, onClose, variant, allowClose} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                    {message}
        </span>
            }
            action={[
                allowClose &&
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    allowClose: PropTypes.node,
    autoHide: PropTypes.node,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);


class Banner extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            autoHideTime: 10000,
        };

        this.handleClose = this.handleClose.bind(this);

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.show !== this.props.show) {
            this.setState({open: this.props.show});
        }
        if (prevProps.message !== this.props.message) {
            this.calculateHideTime(this.props.message);

            if (this.props.message !== null && this.props.message !== "") {

                if (this.props.message !== null && this.props.message.length > 0) {
                    ReactGA.event({
                        category: 'Error Banner',
                        action: this.props.message,
                    });
                }

            }

        }
    }

    calculateHideTime(message) {
        const matches = String(message).match(/[\w\d’-]+/gi);
        const wordsNum = matches ? matches.length : 0;

        //200 Words per minute
        const autoHideTime = (wordsNum / 3.3) * 1000;

        this.setState({autoHideTime: autoHideTime});
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false});
    };


    render() {
        const autoHide = this.props.autoHide ? this.state.autoHideTime : null;

        return (
            typeof this.props.message === "string" &&
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={autoHide}
                    onClose={this.handleClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant={this.props.variant}
                        message={this.props.message}
                        allowClose={this.props.allowClose}
                    />
                </Snackbar>
            </div>
        );
    }
}

Banner.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles1)(Banner);