import React from "react";
import "./index.css";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {
	createStyles,
	makeStyles,
	Theme,
	ThemeProvider,
	withStyles,
	WithStyles,
} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import LinearProgress from "@material-ui/core/LinearProgress";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line @typescript-eslint/camelcase
import jwt_decode from "jwt-decode";
import { createBrowserHistory } from "history";
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
import axios from "axios";
import { Router, Route, Switch } from "react-router-dom";
import { RootState } from "./services/redux/rootReducer";
import { getDecisions } from "./services/redux/DecisionsActions";
import LandingPage from "./scenes/LandingPage";
import NotFound from "./scenes/NotFound/NotFound";
import SecureRoute from "./services/PrivateRoute";
import Decision from "./scenes/Decision/Decision";
import AlertsBanner from "./components/AlertsBanner";
import theme from "./muiTheme";
import dcideLogo from "./images/d-cide_Logo.svg";
import { verifyToken } from "./services/redux/SessionActions";

const { token } = localStorage;

verifyToken(token);

//TODO see if this is necessary
const history = createBrowserHistory();
history.listen((location) => {
	ReactGA.set({ page: location.pathname });
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
	const { isLoading } = useSelector(
		(state: RootState) => state.App,
		shallowEqual
	);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// componentDidMount() {
	// 	ReactGA.pageview(window.location.pathname);
	// }
	//
	// logout() {
	// 	this.props.logout();
	// }
	//
	// handleClick(event) {
	// 	//show menu for registered user
	// 	if (getValueSafe(() => this.props.security.user.registeredUser === true)) {
	// 		this.setState({ anchorEl: event.currentTarget });
	// 	} else {
	// 		//go to login for unregistered users
	// 		history.push("/login");
	// 	}
	// }
	//
	// handleClose() {
	// 	this.setState({ anchorEl: null });
	// }

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
			<Link href="/decisions" style={{ textDecoration: "none" }}>
				<MenuItem>
					<ListItemIcon>
						<ListAltIcon />
					</ListItemIcon>
					<ListItemText primary="Decisions" />
				</MenuItem>
			</Link>
			<Divider />
			{/*TODO replace Link with button*/}
			<Link onClick={handleClose} style={{ textDecoration: "none" }}>
				<MenuItem>
					<ListItemIcon>
						<ExitToAppIcon />
					</ListItemIcon>
					<ListItemText primary="Logout" />
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
								<Link href="/" style={{ textDecoration: "none"}}>
									<CardMedia
										className={classes.logo}
										image={dcideLogo}
										title="d-cide"
									/>
								</Link>
							</div>

							<IconButton
								className={classes.icon}
								// onClick={handleClick}
								onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
									getDecisions(dispatch);
								}}
								color="inherit"
							>
								<AccountCircleIcon />
							</IconButton>
							{userMenu}
						</Toolbar>
					</AppBar>

					<div className={classes.linearProgress}>
						{isLoading > 0 && <LinearProgress color="secondary" />}
					</div>

					<div className={classes.divRouter}>
						<Switch>
							{/*	/!*Public Scenes*!/*/}
							<Route exact path="/" component={LandingPage} />
							{/*<Route component={NotFound} />*/}
							{/*	<Route exact path="/login" component={Login} />*/}
							{/*	<Route exact path="/signUp" component={SignUp} />*/}

							{/*	/!*Private Scenes*!/*/}
							{/*	<SecureRoute exact path="/decisions" component={Decisions} />*/}
							<Route exact path="/decisions/:decisionId" component={Decision} />
						</Switch>
					</div>
					<AlertsBanner />
				</div>
			</Router>
		</ThemeProvider>
	);
};

export default App;
