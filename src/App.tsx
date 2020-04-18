import React from "react";
import "./index.css";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import LinearProgress from "@material-ui/core/LinearProgress";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
import {Route, Switch, useHistory} from "react-router-dom";
import { RootState } from "./services/redux/rootReducer";
import LandingPage from "./scenes/LandingPage";
import Decision from "./scenes/Decision/Decision";
import AlertsBanner from "./components/AlertsBanner";
import theme from "./muiTheme";
import dcideLogo from "./images/d-cide_Logo.svg";
import {
	logout,
	verifyToken,
} from "./services/redux/actionsAndSlicers/SessionActions";
import Login from "./scenes/Login/Login";
import Decisions from "./scenes/Decisions/Decisions";
import PrivateRoute from "./services/PrivateRoute";
import SignUp from "./scenes/SignUp/SignUp";
import NotFound from "./scenes/NotFound/NotFound";

const { token } = localStorage;

verifyToken(token);

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

	const { user } = useSelector(
		(state: RootState) => state.Session,
		shallowEqual
	);

	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const onClickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (user.registeredUser) setAnchorEl(event.currentTarget);
		else history.push("/login");
	};

	const onClickDecisions = () => {
		history.push("/decisions");
		handleClose();
	};

	const onClickLogout = () => {
		logout(dispatch);
		handleClose();
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const userMenu = (
		<Menu
			id="simple-menu"
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClick={handleClose}
			disableAutoFocusItem
		>
			<Link onClick={onClickDecisions} style={{ textDecoration: "none" }}>
				<MenuItem>
					<ListItemIcon>
						<ListAltIcon />
					</ListItemIcon>
					<ListItemText primary="Decisions" />
				</MenuItem>
			</Link>
			<Divider />
			<Link onClick={onClickLogout} style={{ textDecoration: "none" }}>
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
				<div className={classes.divMain}>
					<AppBar position="static" color="primary" className={classes.appBar}>
						<Toolbar>
							<div className={classes.divLogo}>
								<Link href="/" style={{ textDecoration: "none" }}>
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
							<Route exact path="/" component={LandingPage} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/signup" component={SignUp} />
							<PrivateRoute exact path="/decisions" component={Decisions} />
							<PrivateRoute
								exact
								path="/decisions/:decisionId"
								component={Decision}
							/>
							<Route component={NotFound} />
						</Switch>
					</div>
					<AlertsBanner />
				</div>
		</ThemeProvider>
	);
};

export default App;
