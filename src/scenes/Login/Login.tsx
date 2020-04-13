import React, { useEffect, useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Link from "@material-ui/core/Link";
import Fab from "@material-ui/core/Fab";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import TwoButtonsDialog from "../../components/TwoButtonsDialog";
import {changeDecisions, getDecisions} from "../../services/redux/actionsAndSlicers/DecisionsActions";
import { RootState } from "../../services/redux/rootReducer";
import {
	login,
	saveTokenCookie,
} from "../../services/redux/actionsAndSlicers/SessionActions";
import theme from "../../muiTheme";

const useStyles = makeStyles({
	divMain: {
		paddingTop: theme.spacing(6),
		textAlign: "center",
	},

	gridContainer: {
		minWidth: theme.spacing(40),
		maxWidth: theme.spacing(63),
	},

	paper: {
		margin: theme.spacing(1),
	},

	title: {
		paddingTop: theme.spacing(6),
		paddingBottom: theme.spacing(3),
	},

	textField: {
		width: "90%",
	},

	passwordLink: {
		marginLeft: theme.spacing(3),
	},

	loginButton: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(1),
	},

	signUpText: {
		padding: theme.spacing(3),
		textAlign: "center",
	},

	animatedItem: {
		animation: `$shake 500ms ${theme.transitions.easing.sharp}`,
	},

	"@keyframes shake": {
		"0%": {
			transform: "translateX(0)",
		},
		"8%": {
			transform: "translateX(-7%)",
		},
		"25%": {
			transform: "translateX(7%)",
		},
		"41%": {
			transform: "translateX(-7%)",
		},
		"58%": {
			transform: "translateX(7%)",
		},
		"75%": {
			transform: "translateX(-4%)",
		},
		"92%": {
			transform: "translateX(4%)",
		},
		"100%": {
			transform: "translateX(0)",
		},
	},
});

const Login: React.FC = () => {
	const [componentLoaded, setComponentLoaded] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showSaveDecisionDialog, setShowSaveDecisionDialog] = useState(false);
	const [startPasswordAnimation, setStartPasswordAnimation] = useState(false);

	const usernameInput = useRef(null);
	const passwordInput = useRef(null);


	const { user, token, wrongPassword } = useSelector(
		(state: RootState) => state.Session,
		shallowEqual
	);

	const decisions = useSelector(
		(state: RootState) => state.Decisions,
		shallowEqual
	);

	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	useEffect(() => {
		if (user.registeredUser && token !== "") history.push("/decisions");
		if (!user.registeredUser && decisions.length === 0) getDecisions(dispatch);
		usernameInput.current.focus();
		setComponentLoaded(true);
	}, []);

	useEffect(() => {
		if (wrongPassword) {
			if (username === "") usernameInput.current.focus();
			else passwordInput.current.focus();
		}

		setStartPasswordAnimation(wrongPassword);
	}, [wrongPassword]);

	useEffect(() => {
		if (user.registeredUser) {
			setShowSaveDecisionDialog(true);
		}
	}, [user]);

	useEffect(() => {
		if (!showSaveDecisionDialog && componentLoaded) {
			saveTokenCookie(token);
			history.push("/decisions");
		}
	}, [showSaveDecisionDialog]);



	const onSubmitLogin = () => {
		const newUser = {
			username,
			password,
		};

		login(dispatch, newUser);
	};

	const saveDecision = () => {

		console.log(decisions)

		const newUser = {
			username,
			password,
		};

		const decision = {
			id: decisions[0].id,
			name: decisions[0].name,
			user: newUser,
		};

		changeDecisions(dispatch, decision);

		setShowSaveDecisionDialog(false);
	};

	return (
		<div className={classes.divMain}>
			<Grid container justify="center">
				<Paper
					elevation={2}
					key="mainPaper"
					className={clsx(classes.paper, {
						[classes.animatedItem]: startPasswordAnimation,
					})}
				>
					<Grid
						container
						justify="center"
						alignItems="center"
						spacing={0}
						className={classes.gridContainer}
					>
						<Grid item xs={12}>
							<Typography variant="h4" gutterBottom className={classes.title}>
								LOGIN
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="outlined-email-input"
								name="username"
								value={username}
								onChange={(event) => setUsername(event.target.value)}
								label="Email"
								type="email"
								autoComplete="email"
								margin="normal"
								variant="outlined"
								className={classes.textField}
								inputRef={usernameInput}
							/>
						</Grid>
						<Grid item xs={12} className={classes.textField}>
							<TextField
								id="outlined-password-input"
								name="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								label="Password"
								type={showPassword ? "text" : "password"}
								autoComplete="password"
								margin="normal"
								variant="outlined"
								className={classes.textField}
								onKeyPress={(event) => {
									if (event.key === "Enter") {
										event.preventDefault();
										onSubmitLogin();
									}
								}}
								onFocus={(event) => event.target.select()}
								inputRef={passwordInput}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="Show/Hide password"
												name="showPassword"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12} className={classes.loginButton}>
							<Fab
								color="primary"
								variant="extended"
								aria-label="Login"
								className={classes.textField}
								onClick={onSubmitLogin}
							>
								LOGIN
							</Fab>
						</Grid>
						<Grid item xs={12} style={{ textAlign: "center" }}>
							<Typography
								variant="body1"
								className={classes.signUpText}
								gutterBottom
							>
								Don't have an account? &nbsp;
								<Link href="/signUp">Sign up!</Link>
							</Typography>
						</Grid>
						<TwoButtonsDialog
							show={showSaveDecisionDialog}
							title="Save actual decision into your user account?"
							message="The decision you have been working on can be saved into your user account."
							primaryButtonText="Save it!"
							secondaryButtonText="Dismiss it"
							onClickPrimary={() => saveDecision()}
							onClickSecondary={() => setShowSaveDecisionDialog(false)}
						/>
					</Grid>
				</Paper>
			</Grid>
		</div>
	);
};

export default Login;
