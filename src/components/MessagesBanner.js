import React, {Component} from 'react';
import PropTypes from "prop-types";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {green} from "@material-ui/core/colors";
import ReactGA from "react-ga";
import {connect} from "react-redux";
import {deleteMessage} from "../services/actions/Messages_Action";
import Alert from "@material-ui/lab/Alert";



const styles = theme => ({
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
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});



class MessagesBanner extends Component {

    constructor(props) {
        super(props);

        this.state = {
            actualMessage:"",
            open: false,
            autoHideTime: 0,
        };

        this.handleClose = this.handleClose.bind(this);

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.messages !== this.props.messages) {
            this.setMessage(this.filterMessages(this.props.messages));
        }

    }



    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false,});

        this.props.deleteMessage(this.state.actualMessage);

    };

    calculateHideTime(message) {
        const matches = String(message).match(/[\w\d’-]+/gi);
        const wordsNum = matches ? matches.length : 0;

        //200 Words per minute
        const autoHideTime = (wordsNum / 3.3) * 1000;

        this.setState({autoHideTime: autoHideTime});
    }

    filterMessages(messages){
        let message;
        let errors;
        let warnings;

        errors = messages.filter(message => message.type === "error");

        if(errors.length > 0){
            message = errors[0];
        }else{
            warnings = messages.filter(message => message.type === "warning");
            if(warnings.length > 0){
                message = warnings[0];
            }
        }
        return message;
    }

    setMessage(message){

        if (message !== undefined && message !== null){
            this.calculateHideTime(message.text);
            this.setState({
                actualMessage: message,
                open: true,
            });

            ReactGA.event({
                category: 'Message Banner',
                action: `${message.type}: ${message.text}`,
            });

        }else{
            this.setState({
                open: false,
                //don`t reset actual message
            });
        }
    }


    render() {

        const autoHide = this.props.autoHide ? this.state.autoHideTime : null;

        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    autoHideDuration={autoHide} >
                    <Alert
                        onClose={this.handleClose}
                        variant="filled"
                        severity={this.state.actualMessage.type}>
                        {this.state.actualMessage.text}
                    </Alert>
                </Snackbar>
                {/*TODO: allow close*/}
            </div>
        );
    }
}

MessagesBanner.propTypes = {
    classes: PropTypes.object.isRequired,
    messages:PropTypes.object.isRequired,
    deleteMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    messages: state.messages,
});

export default connect(mapStateToProps, {deleteMessage})(withStyles(styles)(MessagesBanner));