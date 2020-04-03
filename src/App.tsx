import React from "react";
import "./index.css";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {
	createStyles,
	Theme,
	ThemeProvider,
	withStyles,
	WithStyles,
} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import dcide_Logo from "./images/d-cide_Logo.svg";
import theme from "./muiTheme";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Router } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import AlertsBanner from "./components/AlertsBanner";
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
import { RootState } from "./services/redux/rootReducer";
import AppSlice from "./services/redux/AppSlice";
import { NOT_ENOUGH_OPTIONS } from "./services/Alerts";
import SessionSlice, {signUp, login, createUnregisteredUser} from "./services/redux/SessionSlice";
import {getDecisions} from "./services/redux/DecisionActions";

const token = localStorage.token;

//Security
if (token) {
	axios.defaults.headers.common["Authorization"] = token;

	const decoded_TOKENToken = jwt_decode(token);
	// store.dispatch({
	//     type: POST_SESSION,
	//     payload: decoded_TOKENToken,
	// });
	//TODO uncomment when reducer ready
	const currentTime = Date.now() / 1000;
	// if (decoded_TOKENToken.exp < currentTime) {
	// 	// store.dispatch(logout());
	// }
}

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

const history = createBrowserHistory();
history.listen((location) => {
	ReactGA.set({ page: location.pathname });
	ReactGA.pageview(location.pathname);
});

const styles = (theme: Theme) =>
	createStyles({
		// const styles = (theme) => ({
		div_main: {
			flexGrow: 1,
			width: "100%",
			overflowX: "hidden", //Avoid negative margin from mainGrid
		},

		appBar: {
			position: "fixed",
			Top: 0,
			height: theme.spacing(6),
			width: "100%",
			justifyContent: "center",
			justifyItems: "center",
		},

		linearProgress: {
			position: "fixed",
			Top: 0,
			marginTop: theme.spacing(6),
			width: "100%",
			height: theme.spacing(1.5),
		},

		div_logo: {
			flex: 1,
			flexGrow: 1,
			height: "100%",
			overflow: "hidden",
			float: "left",
			marginLeft: theme.spacing(-1),
		},

		logo: {
			width: theme.spacing(17),
			height: "100%",
		},

		icon: {
			marginRight: theme.spacing(-2),
		},
	});

interface Props extends WithStyles<typeof styles> {}

const App: React.FC<Props> = (props: Props) => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state: RootState) => state.App, shallowEqual);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

	const { classes } = props;
	// const { isLoading } = this.props.app;

	let userMenu = (
		<Menu
			id="simple-menu"
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClick={handleClose}
			disableAutoFocusItem
		>
			<Link href={"/decisions"} style={{ textDecoration: "none" }}>
				<MenuItem>
					<ListItemIcon>
						<ListAltIcon />
					</ListItemIcon>
					<ListItemText primary="Decisions" />
				</MenuItem>
			</Link>
			<Divider />
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
				<div className={classes.div_main}>
					{/*Title Bar*/}
					<AppBar position="static" color="primary" className={classes.appBar}>
						<Toolbar>
							<div className={classes.div_logo}>
								<Link href={"/"} style={{ textDecoration: "none" }}>
									<CardMedia
										className={classes.logo}
										image={dcide_Logo}
										title="d-cide"
									/>
								</Link>
							</div>

							<IconButton
								className={classes.icon}
								// onClick={handleClick}
								onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
									getDecisions(dispatch)

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
					{isLoading}
					{/*<Switch>*/}
					{/*	/!*Public Scenes*!/*/}
					{/*	<Route exact path="/" component={LandingPage} />*/}
					{/*	<Route exact path="/login" component={Login} />*/}
					{/*	<Route exact path="/signUp" component={SignUp} />*/}

					{/*	/!*Private Scenes*!/*/}
					{/*	<SecureRoute exact path="/decisions" component={Decisions} />*/}
					{/*	<SecureRoute*/}
					{/*		exact*/}
					{/*		path="/decisions/:decisionId"*/}
					{/*		component={Decision}*/}
					{/*	/>*/}
					{/*	<Route component={NotFound} />*/}
					{/*</Switch>*/}
					<AlertsBanner />
				</div>
			</Router>
		</ThemeProvider>
	);
};

// App.propTypes = {
// 	classes: PropTypes.object.isRequired,
// 	app: PropTypes.object.isRequired,
// 	security: PropTypes.object.isRequired,
// 	alerts: PropTypes.object.isRequired,
// 	optionsAndCriteria: PropTypes.object.isRequired,
// 	logout: PropTypes.func.isRequired,
// 	setJWT: PropTypes.func.isRequired,
// };
//
// const mapStateToProps = (state) => ({
// 	app: state.app,
// 	alerts: state.alerts,
// 	security: state.security,
// 	optionsAndCriteria: state.optionsAndCriteria,
// });

// export default connect(mapStateToProps, { logout, setJWT })(
// 	withStyles(styles)(App)
// );

export default withStyles(styles)(App);
