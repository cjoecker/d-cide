import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Grid from "@material-ui/core/Grid/Grid";

import TextField from "@material-ui/core/TextField/index";
import Paper from "@material-ui/core/Paper/index";
import InputAdornment from "@material-ui/core/InputAdornment/index";
import IconButton from "@material-ui/core/IconButton/index";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from "@material-ui/core/Link/index";
import Fab from "@material-ui/core/Fab/index";

import {connect} from "react-redux";
import {login} from "../../services/actions/Security_Action";
import Typography from "@material-ui/core/Typography";
import TwoButtonsDialog from "../../components/TwoButtonsDialog";

import ReactGA from "react-ga";
import {get_decisions, transfer_decisionToUser} from "../../services/actions/Decisions_Action";
import {getValueSafe} from "../../services/generalUtils";


const styles = theme => ({

    mainDiv: {
        paddingTop: theme.spacing.unit * 8,
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
        paddingTop: theme.spacing.unit * 6,
        paddingBottom: theme.spacing.unit * 3,

    },

    textField: {
        width: "90%",
    },

    textFieldGrid: {
        textAlign: "center",
        textJustify: "bottom"
    },

    passwordLink: {
        marginLeft: theme.spacing.unit * 3,
        textJustify: "bottom"
    },

    linkButton: {
        textAlign: "center",
        textJustify: "bottom",
        paddingTop: theme.spacing.unit * 3
    },

    signUpText: {
        padding: theme.spacing.unit * 3,
        textAlign: "center"
    },


});


class Login extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            showPassword: false,
            rememberMe: false,
            errors: {},
            showSaveDecision: false,
            unregisteredUsername: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onToggleShowPass = this.onToggleShowPass.bind(this);
        this.onToggleRememberMe = this.onToggleRememberMe.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.saveDecision = this.saveDecision.bind(this);
        this.dismissDecision = this.dismissDecision.bind(this);
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onToggleRememberMe(e) {
        this.setState({[e.target.name]: e.target.checked});
    }


    onToggleShowPass() {
        this.setState({showPassword: !this.state.showPassword});
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        //show errors
        if (prevProps.errors !== this.props.errors) {
            this.setState({errors: this.props.errors});
        }


        //Show form to transfer decision to user
        if (getValueSafe(() => prevProps.security.user.registeredUser) === false && getValueSafe(() => this.props.security.user.registeredUser) === true) {
            this.setState({showSaveDecision: true});
        }

        //Go to decisions after asking to save decision
        if (prevState.showSaveDecision && !this.state.showSaveDecision) {
            this.props.history.push("/decisions");
        }

        //Go to decisions after asking to save decision
        if (getValueSafe(() => prevProps.security.user.registeredUser) === null
            && getValueSafe(() => this.props.security.user.registeredUser) === true
        ) {
            this.props.history.push("/decisions");
        }


    }


    async onSubmit() {
        const user = {
            username: this.state.username,
            password: this.state.password
        };

        await this.props.login(user);


    }

    showSaveDecision(e) {
        this.setState({showSaveDecision: true});
        ReactGA.event({
            category: 'Login',
            action: 'Show Save Decision Dialog'
        });
    };


    async saveDecision(e) {

        this.setState({showSaveDecision: false,});

        await this.props.transfer_decisionToUser(this.state.unregisteredUsername);

        ReactGA.event({
            category: 'Login',
            action: 'Save Decision'
        });
    };

    dismissDecision(e) {

        this.setState({showSaveDecision: false,});

        ReactGA.event({
            category: 'Login',
            action: 'Dismiss Decision'
        });
    };

    componentDidMount() {
        if (this.props.security.validToken && this.props.security.user.registeredUser) {
            this.props.history.push("/decisions");
        }

        if (this.props.security.user !== null) {
            if (!this.props.security.user.registeredUser) {
                this.setState({unregisteredUsername: this.props.security.user.username});
            }
        }

    }

    render() {
        const {classes} = this.props;
        const {errors} = this.state;

        return (
            <div className={classes.mainDiv}>
                <Grid container justify="center">
                    <Paper elevation={2} key="mainPaper" className={classes.paper}>
                        <Grid container justify="center" alignItems="center" spacing={0} className={classes.grid}>

                            {/*Title*/}
                            <Grid item xs={12} className={classes.gridTopCell}>
                                <Typography variant="h4" gutterBottom>
                                    LOGIN
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
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    autoComplete="password"
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.textField}
                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            this.onSubmit();
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Show/Hide password"
                                                    name="showPassword"
                                                    onClick={this.onToggleShowPass}
                                                >
                                                    {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Grid>

                            {/*RememberMe*/}
                            {/*<Grid item xs={6} style={{justify: 'left'}}>*/}
                            {/*    <FormControlLabel*/}
                            {/*        control={*/}
                            {/*            <Switch*/}
                            {/*                name="rememberMe"*/}
                            {/*                checked={this.state.rememberMe}*/}
                            {/*                onChange={this.onToggleRememberMe}*/}
                            {/*                value="rememberMe"*/}
                            {/*                color="primary"*/}
                            {/*            />*/}
                            {/*        }*/}
                            {/*        label="Remember Me"*/}
                            {/*        style={{marginLeft: '5%'}}*/}
                            {/*    />*/}
                            {/*</Grid>*/}

                            {/*Forgot Password*/}
                            {/*<Grid item xs={6} style={{textAlign: 'right'}}>*/}
                            {/*<Grid item xs={12} style={{textAlign: 'left'}}>*/}
                                {/*<Link href={'/Login'} className={classes.passwordLink}>*/}
                                    {/*Forgot Password?*/}
                                {/*</Link>*/}
                            {/*</Grid>*/}

                            {/*Login Button*/}
                            <Grid item xs={12} className={classes.linkButton}>
                                <Fab
                                    color="primary"
                                    variant="extended"
                                    aria-label="Login"
                                    className={classes.textField}
                                    onClick={this.onSubmit}
                                >
                                    LOGIN
                                </Fab>
                            </Grid>

                            {/*SignUp*/}
                            <Grid item xs={12} style={{textAlign: 'center'}}>
                                <Typography variant="body1" className={classes.signUpText} gutterBottom>
                                    Don't have an account? &nbsp;
                                    <Link href={'/signUp'}>
                                        Sign up!
                                    </Link>
                                </Typography>
                            </Grid>

                            {/*Save unlogged decision*/}
                            <TwoButtonsDialog
                                show={this.state.showSaveDecision}
                                title="Save actual decision into your user account?"
                                message="The actual decision you have been working on unlogged will be saved into your user account."
                                primaryButtonText="Save it!"
                                secondaryButtonText="Dismiss it"
                                handlePrimary={(e) => this.saveDecision(e)}
                                handleSecondary={(e) => this.dismissDecision(e)}
                            />


                        </Grid>
                    </Paper>
                </Grid>
            </div>

        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    decision: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    transfer_decisionToUser: PropTypes.func.isRequired,
    get_decisions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security,
    decision: state.decision,
});


export default connect(mapStateToProps, {login, transfer_decisionToUser, get_decisions})(withStyles(styles)(Login));
