import React, {Component} from 'react';
import './index.css';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import dcide_Logo from "./images/d-cide_Logo.svg"
import theme from "./muiTheme"
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import LinearProgress from "@material-ui/core/LinearProgress";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./scenes/Security/Login";
import store from "./store";
import SignUp from "./scenes/Security/SignUp";
import jwt_decode from "jwt-decode";
import setJWTToken from "./services/securityUtils";
import {SET_CURRENT_USER} from "./services/actions/types";
import Decision from "./scenes/Decision/Decision";
import Decisions from "./scenes/Decisions/Decisions";
import {logout} from "./services/actions/Security_Action";
import SecureRoute from "./services/SecureRoute";
import LandingPage from "./scenes/LandingPage";
import Banner from "./components/Banner";
import NotFound from "./scenes/NotFound/NotFound";
import {createBrowserHistory} from "history";
import ReactGA from 'react-ga';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import ListAltIcon from "@material-ui/icons/Assignment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {getValueSafe} from "./services/generalUtils";
import ForgotPassword from "./scenes/Security/ForgotPassword";

const jwtToken = localStorage.jwtToken;

//Security
if (jwtToken) {
    setJWTToken(jwtToken);
    const decoded_jwtToken = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_jwtToken
    });
    const currentTime = Date.now() / 1000;
    if (decoded_jwtToken.exp < currentTime) {
        store.dispatch(logout());
    }
}

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const history = createBrowserHistory();
history.listen(location => {
    ReactGA.set({page: location.pathname});
    ReactGA.pageview(location.pathname);
});

const styles = theme => ({
        root: {
            flexGrow: 1,
            width: '100%',
            overflowX: 'hidden', //Avoid negative margin from mainGrid
        },

        appTopBar: {
            position: 'fixed',
            Top: 0,
            height: theme.spacing.unit * 6,
            width: '100%',
            justifyContent: 'center',
            justifyItems: 'center',
        },

        loadingBar: {
            position: 'fixed',
            Top: 0,
            marginTop: theme.spacing.unit * 6,
            width: '100%',
            height: theme.spacing.unit * 1.5,
        },


        logoDiv: {
            flex: 1,
            flexGrow: 1,
            height: "100%",
            overflow: 'hidden',
            float: 'left',
            marginLeft: theme.spacing.unit * -1,
        },

        logo: {
            width: theme.spacing.unit * 17,
            height: '100%',
        },

        icon: {
            marginRight: theme.spacing.unit * -2
        },


    })
;

class App extends Component {


    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    componentDidMount() {
        ReactGA.pageview(window.location.pathname)
    }

    logout() {
        this.props.logout();
    }

    handleClick(event) {
        //show menu for registered user
        if (getValueSafe(() => this.props.security.user.registeredUser === true)) {
            this.setState({anchorEl: event.currentTarget});
        }else {
            //go to login for unregistered users
            history.push("/login");
        }
    }

    handleClose() {
        this.setState({anchorEl: null});
    }


    render() {

        ReactGA.initialize('UA-139517059-1');

        const {classes} = this.props;
        const {isLoading} = this.props.app;

        const errorsPresent = Object.keys(this.props.errors).length !== 0;


        let userMenu = (
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClick={(e) => this.handleClose(e)}
                    disableAutoFocusItem
                >

                    <Link href={'/decisions'} style={{textDecoration: 'none'}}>
                        <MenuItem>
                            <ListItemIcon>
                                <ListAltIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Decisions"/>
                        </MenuItem>
                    </Link>
                    <Divider/>
                    {/*<Link href={'/UserSettings'} style={{textDecoration: 'none'}}>*/}
                        {/*<MenuItem>*/}
                            {/*<ListItemIcon>*/}
                                {/*<SettingsIcon/>*/}
                            {/*</ListItemIcon>*/}
                            {/*<ListItemText primary="User Settings"/>*/}
                        {/*</MenuItem>*/}
                    {/*</Link>*/}
                    <Link onClick={this.logout.bind(this)} style={{textDecoration: 'none'}}>
                        <MenuItem>
                            <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Logout"/>
                        </MenuItem>
                    </Link>
                </Menu>
            );



        return (
            <MuiThemeProvider theme={theme}>
                <Router history={history}>
                    <div className={classes.root}>
                        {/*Title Bar*/}
                        <AppBar position="static"
                                color="primary"
                                className={classes.appTopBar}
                        >
                            <Toolbar>

                                <div className={classes.logoDiv}>
                                    <Link href={'/'} style={{textDecoration: 'none'}}>
                                    <CardMedia
                                        className={classes.logo}
                                        image={dcide_Logo}
                                        title="d-cide"
                                    />
                                    </Link>
                                </div>

                                <IconButton
                                    className={classes.icon}
                                    onClick={(e) => this.handleClick(e)}
                                    color="inherit"
                                >
                                    <AccountCircleIcon/>
                                </IconButton>
                                {userMenu}
                            </Toolbar>
                        </AppBar>

                        {/*Loading Bar*/}
                        <div className={classes.loadingBar}>
                            {isLoading > 0 &&
                            <LinearProgress color="secondary"/>
                            }
                        </div>
                        <Switch>
                            {/*Public Scenes*/}
                            <Route exact path="/" component={LandingPage}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/signUp" component={SignUp}/>
                            <Route exact path="/forgotPassword" component={ForgotPassword}/>
                            {/*<Route exact path="/resetPassword" component={ResetPassword}/>*/}

                            {/*Private Scenes*/}
                            <SecureRoute exact path="/decisions" component={Decisions}/>
                            <SecureRoute exact path="/decisions/:decisionId" component={Decision}/>
                            <Route component={NotFound}/>
                        </Switch>


                        {/*Connection Errors*/}
                        <Banner
                            show={errorsPresent}
                            variant="error"
                            message={this.props.errors}
                            allowClose={true}
                            autoHide={false}
                        />
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}


App.propTypes = {
    classes: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    optionsAndCriteria: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    app: state.app,
    errors: state.errors,
    security: state.security,
    optionsAndCriteria: state.optionsAndCriteria
});


export default connect(mapStateToProps, {
    logout,
})(withStyles(styles)(App));