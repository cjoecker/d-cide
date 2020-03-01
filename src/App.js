import React from 'react';
import './index.css';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import dcide_Logo from "./images/d-cide_Logo.svg"
import theme from "./muiTheme"
import {ThemeProvider } from '@material-ui/core/styles';
import LinearProgress from "@material-ui/core/LinearProgress";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./scenes/Login/Login";
import store from "./store";
import SignUp from "./scenes/SignUp/SignUp";
import jwt_decode from "jwt-decode";
import Decision from "./scenes/Decision/Decision";
import Decisions from "./scenes/Decisions/Decisions";
import {logout, postSession, setJWT} from "./services/actions/Sessions_Action";
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
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {getValueSafe} from "./services/GeneralUtils";
import {POST_SESSION} from "./services/actions/types";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const jwtToken = localStorage.jwtToken;

//Security
if (jwtToken) {

    axios.defaults.headers.common["Authorization"] = jwtToken;

    const decoded_jwtToken = jwt_decode(jwtToken);
    store.dispatch({
        type: POST_SESSION,
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
        div_main: {
            flexGrow: 1,
            width: '100%',
            overflowX: 'hidden', //Avoid negative margin from mainGrid
        },

        appBar: {
            position: 'fixed',
            Top: 0,
            height: theme.spacing(6),
            width: '100%',
            justifyContent: 'center',
            justifyItems: 'center',
        },

        linearProgress: {
            position: 'fixed',
            Top: 0,
            marginTop: theme.spacing(6),
            width: '100%',
            height: theme.spacing(1.5),
        },


        div_logo: {
            flex: 1,
            flexGrow: 1,
            height: "100%",
            overflow: 'hidden',
            float: 'left',
            marginLeft: theme.spacing(-1),
        },

        logo: {
            width: theme.spacing(17),
            height: '100%',
        },

        icon: {
            marginRight: theme.spacing(-2),
        },
});

class App extends React.Component {


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
            <ThemeProvider theme={theme}>
                <Router history={history}>
                    <div className={classes.div_main}>
                        {/*Title Bar*/}
                        <AppBar position="static"
                                color="primary"
                                className={classes.appBar}
                        >
                            <Toolbar>

                                <div className={classes.div_logo}>
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
                        <div className={classes.linearProgress}>
                            {isLoading > 0 &&
                            <LinearProgress color="secondary"/>
                            }
                        </div>
                        <Switch>
                            {/*Public Scenes*/}
                            <Route exact path="/" component={LandingPage}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/signUp" component={SignUp}/>

                            {/*Private Scenes*/}
                            <SecureRoute exact path="/decisions" component={Decisions}/>
                            <SecureRoute exact path="/decisions/:decisionId" component={Decision}/>
                            <Route component={NotFound}/>
                        </Switch>

                        {/*/!*Connection Errors*!/*/}
                        <Banner
                            show={errorsPresent}
                            variant="error"
                            message={this.props.errors}
                            allowClose={true}
                            autoHide={false}
                        />
                    </div>
                </Router>
            </ThemeProvider>
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
    setJWT: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    app: state.app,
    errors: state.errors,
    security: state.security,
    optionsAndCriteria: state.optionsAndCriteria,
});




export default connect(mapStateToProps, {logout,setJWT})(withStyles(styles)(App));

