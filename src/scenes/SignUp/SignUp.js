import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/index";
import Paper from "@material-ui/core/Paper/index";
import Link from "@material-ui/core/Link/index";
import Fab from "@material-ui/core/Fab/index";
import Typography from "@material-ui/core/Typography/index";
import * as LongStrings from "../../components/LongStrings";
import {connect} from "react-redux";
import {postSession, postUser} from "../../services/actions/Sessions_Action";
import ReactGA from "react-ga";
import InfoDialog from "../../components/InfoDialog";




const styles = theme => ({

    mainDiv: {
        paddingTop: theme.spacing.unit * 8,
    },

    grid: {
        minWidth: theme.spacing.unit * 40,
        maxWidth: theme.spacing.unit * 63,
    },

    gridTopCell: {
        textAlign: "center",
        textJustify: "center",
        paddingTop: theme.spacing.unit * 6,

    },

    paper: {
        margin: theme.spacing.unit * 1,
    },

    textField: {
        width: "90%",
    },

    textFieldGrid: {
        textAlign: "center",
        textJustify: "bottom",
        paddingTop: theme.spacing.unit * 1,
    },

    textFieldPassword: {
        textAlign: "center",
        textJustify: "bottom",
        paddingTop: 0,
    },

    legalLink: {
        textAlign: "center",
        textJustify: "center",
        paddingTop: theme.spacing.unit * 2,
    },

    signUpButton:{
        textAlign: "center",
        textJustify: "bottom",
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 4
    }


});


class SignUp extends React.Component {

    constructor() {
        super();

        this.state = {
            username: '',
            fullName: '',
            password: '',
            confirmPassword: '',
            errors: {},
            privacyPolicyShow: false,
            termsAndConditionsShow: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }



    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmit() {
        const newUser = {
            username: this.state.username,
            registeredUser: true,
            fullName: this.state.fullName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        await this.props.postUser(newUser, this.props.history);

    }

    showInfo(e, name) {
        this.setState({[name]: true});
        ReactGA.event({
            category: 'Options And Criteria',
            action: 'Show Info'
        });
    };

    hideInfo(e, name) {
        this.setState({[name]: false,});
        ReactGA.event({
            category: 'Options And Criteria',
            action: 'Hide Info'
        });
    };


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors });
        }

        //Login and redirect after signup
        if (prevProps.security.signUpSuccessful === false &&
            this.props.security.signUpSuccessful === true) {


            const user = {
                username: this.state.username,
                password: this.state.password
            };

            await this.props.postSession(user);

            this.props.history.push("/decisions");

        }
    }


    render() {
        const {classes} = this.props;
        const { errors } = this.state;


        return (
            <div className={classes.mainDiv}>
                <Grid container justify = "center">
                    <Paper className={classes.paper} elevation={2} key="mainPaper"  >
                        <Grid container justify="center" alignItems="center" spacing={0} className={classes.grid}>

                            {/*Title*/}
                            <Grid item xs={12} className={classes.gridTopCell}>
                                <Typography variant="h4" className={classes.textFieldGrid} gutterBottom>
                                    SIGN UP
                                </Typography>
                            </Grid>
                            {/*Email*/}
                            <Grid item xs={12} className={classes.textFieldGrid}>
                                <TextField
                                    id="outlined-email-input"
                                    name="username"
                                    error={errors.username}
                                    helperText={errors.username}
                                    value={this.state.username}
                                    onChange={this.onChange}
                                    label="Email"
                                    type="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    className={classes.textField}
                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            this.onSubmit();
                                        }
                                    }}
                                />
                            </Grid>
                            {/*Full Name*/}
                            <Grid item xs={12} className={classes.textFieldGrid}>
                                <TextField
                                    id="outlined-fullName-input"
                                    name="fullName"
                                    error={errors.fullName}
                                    helperText={errors.fullName}
                                    value={this.state.fullName}
                                    onChange={this.onChange}
                                    label="Full Name"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    className={classes.textField}
                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            this.onSubmit();
                                        }
                                    }}
                                />
                            </Grid>

                            {/*Password*/}
                            <Grid item xs={12} className={classes.textFieldGrid}>
                                <TextField
                                    id="outlined-password-input"
                                    name="password"
                                    error={errors.password}
                                    helperText={errors.password}
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    label="Password"
                                    type={'password'}
                                    autoComplete="password"
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    className={classes.textField}
                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            this.onSubmit();
                                        }
                                    }}
                                />
                            </Grid>

                            {/*Confirm Password*/}
                            <Grid item xs={12} className={classes.textFieldPassword} >
                                <TextField
                                    id="outlined-confirmPassword-input"
                                    name="confirmPassword"
                                    error={errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    value={this.state.confirmPassword}
                                    onChange={this.onChange}
                                    label="Confirm Password"
                                    type={'password'}
                                    autoComplete="confirmPassword"
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    className={classes.textField}
                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            this.onSubmit();
                                        }
                                    }}
                                />
                            </Grid>

                            {/*Legal Link*/}
                            <Grid item xs={12} className={classes.legalLink}>
                                <Typography variant="caption" gutterBottom>
                                By clicking Sign Up, you confirm that you have read and agree to the&nbsp;
                                <Link
                                    style={{cursor: "pointer"}}
                                    onClick={(e) => this.showInfo(e,"privacyPolicyShow")}
                                >
                                    Privacy Policy
                                </Link>
                                &nbsp;and&nbsp;
                                <Link
                                    style={{cursor: "pointer"}}
                                    onClick={(e) => this.showInfo(e,"termsAndConditionsShow")}
                                >
                                    Terms of Service
                                </Link>
                                .
                                </Typography>
                            </Grid>

                            {/*SignUp Button*/}
                            <Grid item xs={12} className={classes.signUpButton}>
                                <Fab
                                    color="primary"
                                    variant="extended"
                                    aria-label="Sign Up"
                                    className={classes.textField}
                                    onClick={this.onSubmit}
                                >
                                    SIGN UP
                                </Fab>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {/*Info Dialogs*/}
                <InfoDialog
                    text={LongStrings.PrivacyPolicy}
                    show={this.state.privacyPolicyShow}
                    hide={(e) => this.hideInfo(e, "privacyPolicyShow")}
                />
                <InfoDialog
                    text={LongStrings.TermsAndConditions}
                    show={this.state.termsAndConditionsShow}
                    hide={(e) => this.hideInfo(e, "termsAndConditionsShow")}
                />
            </div>

        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    postUser: PropTypes.func.isRequired,
    postSession: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security,
});


export default connect(mapStateToProps, {postUser, postSession})(withStyles(styles)(SignUp));
