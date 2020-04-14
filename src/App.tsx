import React from "react";
import "./index.css";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles, ThemeProvider,} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import LinearProgress from "@material-ui/core/LinearProgress";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
// eslint-disable-next-line @typescript-eslint/camelcase
import {createBrowserHistory} from "history";
import ReactGA from "react-ga";
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
import {Route, Router, Switch} from "react-router-dom";
import {RootState} from "./services/redux/rootReducer";
import LandingPage from "./scenes/LandingPage";
import Decision from "./scenes/Decision/Decision";
import AlertsBanner from "./components/AlertsBanner";
import theme from "./muiTheme";
import dcideLogo from "./images/d-cide_Logo.svg";
import {logout, verifyToken} from "./services/redux/actionsAndSlicers/SessionActions";
import Login from "./scenes/Login/Login";
import Decisions from "./scenes/Decisions/Decisions";
import PrivateRoute from "./services/PrivateRoute";

const {token} = localStorage;

verifyToken(token);

//TODO see if this is necessary
const history = createBrowserHistory();
history.listen((location) => {
    ReactGA.set({page: location.pathname});
    ReactGA.pageview(location.pathname);
});

const useStyles = makeStyles({
    divMain: {
        flexGrow: 1,
        width: "100%",
        overflowX: "hidden", //Avoid negative margin from mainGrid
    },

    appBar: {
        position: "fixed",
        Top: 0,
        marginBottom: theme.spacing(2),
        height: theme.spacing(6),
        width: "100%",
        justifyContent: "center",
        justifyItems: "center",
    },

    linearProgress: {
        position: "fixed",
        marginTop: theme.spacing(6),
        Top: 0,
        width: "100%",
    },

    divLogo: {
        flex: 1,
        flexGrow: 1,
        height: "100%",
        overflow: "hidden",
        float: "left",
        marginLeft: theme.spacing(-1),
    },

    divRouter: {
        marginTop: theme.spacing(6),
    },


    logo: {
        width: theme.spacing(17),
        height: "100%",
    },

    icon: {
        marginRight: theme.spacing(-2),
    },
});

const App: React.FC = () => {
    const {isLoading} = useSelector(
        (state: RootState) => state.App,
        shallowEqual
    );

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const {user} = useSelector(
        (state: RootState) => state.Session,
        shallowEqual
    );

    const classes = useStyles();
    const dispatch = useDispatch();

    const onClickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (user.registeredUser)
            setAnchorEl(event.currentTarget);
        else
            history.push("/login");

    };

    const onClickDecisions = () => {
        history.push("/decisions");
        handleClose()
    };

    const onClickLogout = () => {
        logout(dispatch)
        handleClose()
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    ReactGA.initialize("UA-139517059-1");

    // const { isLoading } = this.props.app;

    const userMenu = (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClick={handleClose}
            disableAutoFocusItem
        >
            <Link onClick={onClickDecisions} style={{textDecoration: "none"}}>
                <MenuItem>
                    <ListItemIcon>
                        <ListAltIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Decisions"/>
                </MenuItem>
            </Link>
            <Divider/>
            <Link onClick={onClickLogout} style={{textDecoration: "none"}}>
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
                <div className={classes.divMain}>
                    {/*Title Bar*/}
                    <AppBar position="static" color="primary" className={classes.appBar}>
                        <Toolbar>
                            <div className={classes.divLogo}>
                                <Link href="/" style={{textDecoration: "none"}}>
                                    <CardMedia
                                        className={classes.logo}
                                        image={dcideLogo}
                                        title="d-cide"
                                    />
                                </Link>
                            </div>

                            <IconButton
                                className={classes.icon}
                                onClick={onClickUser}
                                color="inherit"
                            >
                                <AccountCircleIcon/>
                            </IconButton>
                            {userMenu}
                        </Toolbar>
                    </AppBar>

                    <div className={classes.linearProgress}>
                        {isLoading > 0 && <LinearProgress color="secondary"/>}
                    </div>

                    <div className={classes.divRouter}>
                        <Switch>
                            {/*	/!*Public Scenes*!/*/}
                            <Route exact path="/" component={LandingPage}/>
                            {/*<Route component={NotFound} />*/}
                            <Route exact path="/login" component={Login}/>
                            {/*	<Route exact path="/signUp" component={SignUp} />*/}
                            <PrivateRoute exact path="/decisions" component={Decisions} />
                            <PrivateRoute exact path="/decisions/:decisionId" component={Decision}/>
                        </Switch>
                    </div>
                    <AlertsBanner/>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
