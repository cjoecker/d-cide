import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Link from "@material-ui/core/Link";
import Fab from "@material-ui/core/Fab";
import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import TwoButtonsDialog from "../../components/TwoButtonsDialog";
import ReactGA from "react-ga";
import {
	getDecisions,
	putDecision,
} from "../../services/redux/actionsAndSlicers/DecisionsActions";
import { getValueSafe } from "../../services/GeneralUtils";
import {RootState} from "../../services/redux/rootReducer";
import {useHistory} from "react-router-dom";
import {login} from "../../services/redux/actionsAndSlicers/SessionActions";

const useStyles = makeStyles({
	divMain: {
		paddingTop: theme.spacing(8),
		textAlign: "center",
		textJustify: "center",
	},

	TitleTypography: {
		marginTop: theme.spacing(1),
	},

	gridContainer: {
		minWidth: theme.spacing(40),
		maxWidth: theme.spacing(63),
	},

	paper: {
		margin: theme.spacing(1),
	},

	TitleGridItem: {
		paddingTop: theme.spacing(6),
		paddingBottom: theme.spacing(3),
	},

	textField: {
		width: "90%",
	},

	gridItem_textField: {
		textJustify: "bottom",
	},

	passwordLink: {
		marginLeft: theme.spacing(3),
		textJustify: "bottom",
	},

	gridItem_button: {
		textJustify: "bottom",
		paddingTop: theme.spacing(3),
	},

	typography_signUp: {
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

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [wrongPassword, setWrongPassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showSaveDecisionDialog, setShowSaveDecisionDialog] = useState(false);

	const passwordInput = React.createRef();

	const { user, token } = useSelector(
		(state: RootState) => state.Session,
		shallowEqual
	);

	const decisions = useSelector(
		(state: RootState) => state.Decisions,
		shallowEqual
	);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if(user.registeredUser && token !== "")
			history.push("/decisions")
	}, []);

	useEffect(() => {
		if(user.registeredUser)
			setShowSaveDecisionDialog(true)
	}, [user]);


	//TODO save after click save in dialog

	useEffect(() => {
		if(user.registeredUser)
			setShowSaveDecisionDialog(true)
	}, [user]);

//TODO wrong password
		// //wrong password
		// if (
		// 	getValueSafe(() => prevProps.errors.password) === null &&
		// 	getValueSafe(() => this.props.errors.password) !== null
		// ) {
		// 	this.setState({
		// 		wrongPassword: true,
		// 		password: "",
		// 	});
		// 	this.passwordInput.current.focus();
		// }




	const onSubmit = () => {
		setWrongPassword(false);

		const user = {
			username,
			password,
		};

		login(dispatch, user)
	}

	const  saveDecision = () => {
		const user = {
			username,
			password,
		};

		const decision = {
			id: decisions[0].id,
			name: decisions[0].name,
			user: user,
		};

		//transfer decision to user
		await this.props.putDecision(decision);

		await this.props.setJWT(this.props.security.token);

		this.setState({ showSaveDecision: false });
	}

	async dismissDecision(e) {
		await this.props.setJWT(this.props.security.token);

		this.setState({ showSaveDecision: false });

		ReactGA.event({
			category: "Login",
			action: "Dismiss Decision",
		});
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.divMain}>
				<Grid container justify="center">
					<Paper
						elevation={2}
						key="mainPaper"
						className={clsx(classes.paper, {
							[classes.animatedItem]: this.state.wrongPassword,
						})}
					>
						<Grid
							container
							justify="center"
							alignItems="center"
							spacing={0}
							className={classes.gridContainer}
						>
							{/*Title*/}
							<Grid item xs={12} className={classes.gridItem_title}>
								<Typography variant="h4" gutterBottom>
									LOGIN
								</Typography>
							</Grid>
							{/*Email*/}
							<Grid item xs={12} className={classes.gridItem_textField}>
								<TextField
									id="outlined-email-input"
									name="username"
									value={username}
									onChange={(event)=> setUsername(event.target.value)}
									label="Email"
									type="email"
									autoComplete="email"
									margin="normal"
									variant="outlined"
									className={classes.textField}
									onKeyPress={(event) => {
										if (event.key === "Enter") {
											event.preventDefault();
											this.onSubmit();
										}
									}}
								/>
							</Grid>

							{/*Password*/}
							<Grid item xs={12} className={classes.gridItem_textField}>
								<TextField
									id="outlined-password-input"
									name="password"
									value={password}
									onChange={(event)=> setPassword(event.target.value)}
									label="Password"
									type={this.state.showPassword ? "text" : "password"}
									autoComplete="password"
									margin="normal"
									variant="outlined"
									className={classes.textField}
									onKeyPress={(event) => {
										if (event.key === "Enter") {
											event.preventDefault();
											this.onSubmit();
										}
									}}
									inputRef={this.passwordInput}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="Show/Hide password"
													name="showPassword"
													onClick={this.onToggleShowPass}
												>
													{this.state.showPassword ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Grid>

							{/*Login Button*/}
							<Grid item xs={12} className={classes.gridItem_button}>
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
							<Grid item xs={12} style={{ textAlign: "center" }}>
								<Typography
									variant="body1"
									className={classes.typography_signUp}
									gutterBottom
								>
									Don't have an account? &nbsp;
									<Link href={"/signUp"}>Sign up!</Link>
								</Typography>
							</Grid>

							{/*Save unlogged decision*/}
							<TwoButtonsDialog
								show={this.state.showSaveDecision}
								title="Save actual decision into your user account?"
								message="The actual decision you have been working on unlogged can be saved into your user account."
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



export default Login
