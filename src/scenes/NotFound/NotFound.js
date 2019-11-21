import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Grid from "@material-ui/core/Grid/Grid";

import Paper from "@material-ui/core/Paper/index";

import {connect} from "react-redux";
import {login} from "../../services/actions/Security_Action";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ReactGA from "react-ga";


const styles = theme => ({

    mainDiv: {
        marginTop: theme.spacing.unit * 8,
    },

    titleText: {
        textAlign: "center",
        marginTop: theme.spacing.unit * 1,
    },

    grid: {
        minWidth: theme.spacing.unit * 40,
        maxWidth: theme.spacing.unit * 63,
    },

    paper: {
        margin: theme.spacing.unit * 1,
    },

    gridTopCell: {
        textAlign: "center",
        textJustify: "center",
        paddingTop: theme.spacing.unit * 4,
    },


    linkButton: {
        textAlign: "center",
        textJustify: "bottom",
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
    },


});


class Login extends React.Component {


    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit() {
        ReactGA.event({
            category: 'Not Found',
            action: 'Go Home',
        });

        this.props.history.push("/");
    }

    componentDidMount() {
        ReactGA.event({
            category: 'Not Found',
            action: 'Landed in not Found',
        });
    }


    render() {
        const {classes} = this.props;

        return (
            <div className={classes.mainDiv}>
                <Grid container justify = "center">
                    <Paper elevation={2} key="mainPaper" className={classes.paper} >
                        <Grid container justify="center" alignItems="center" spacing={0} className={classes.grid}>

                            {/*Title*/}
                            <Grid item xs={12} className={classes.gridTopCell}>
                                <Typography variant="h4" gutterBottom>
                                    Oops!
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Page not found...
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.linkButton} >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.onSubmit}>
                                    GO HOME
                                </Button>
                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>
            </div>

        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security,
});


export default connect(mapStateToProps, {login})(withStyles(styles)(Login));
