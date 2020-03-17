import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";


const styles = theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
    text: {
        textAlign: 'justify',
    },
});

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class TwoButtonsDialog extends React.Component {


    onClickPrimary = () => {
        this.props.handlePrimary(false);
    };

    onClickSecondary = () => {
        this.props.handleSecondary(false);
    };

    render() {

        return (
            <div>
                <Dialog
                    open={this.props.show}
                    TransitionComponent={Transition}
                    disableBackdropClick
                    disableEscapeKeyDown
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.props.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.props.alert}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClickSecondary} color="secondary">
                            {this.props.secondaryButtonText}
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.onClickPrimary}>
                            {this.props.primaryButtonText}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

TwoButtonsDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TwoButtonsDialog);
