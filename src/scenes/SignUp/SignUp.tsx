import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import * as LongStrings from "../../services/LongTexts";
import InfoDialog from "../../components/InfoDialog";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	login, saveTokenCookie,
	signUp,
} from "../../services/redux/actionsAndSlicers/SessionActions";
import theme from "../../muiTheme";
import { RootState } from "../../services/redux/rootReducer";
import { initialState } from "../../services/redux/actionsAndSlicers/SessionSlice";

const useStyles = makeStyles({
	divMain: {
		textAlign: "center",
		paddingTop: theme.spacing(4),
	},

	gridContainer: {
		minWidth: theme.spacing(40),
		maxWidth: theme.spacing(63),
	},

	TitleGridItem: {
		paddingTop: theme.spacing(4),
	},

	paper: {
		margin: theme.spacing(1),
	},

	textField: {
		width: "90%",
	},

	gridItem_textField: {
		paddingTop: theme.spacing(1),
	},

	textField_password: {
		paddingTop: 0,
	},

	gridItem_legalLink: {
		paddingTop: theme.spacing(2),
		marginLeft:theme.spacing(2),
		marginRight:theme.spacing(2),
	},

	button: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(4),
	},
});

const SignUp: React.FC = () => {
	const [isMounted, setIsMounted] = useState(false);
	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
	const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);

	const [signUpRequest, setSignUpRequest] = useState(initialState.signUpErrors);

	const { signUpSuccessful, user, signUpErrors, token } = useSelector(
		(state: RootState) => state.Session,
		shallowEqual
	);

	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		console.log("hola")
		if (signUpSuccessful) {
			const user = {
				username: signUpRequest.username,
				password: signUpRequest.password,
			};

			login(dispatch, user);
		}
	}, [signUpSuccessful]);

	useEffect(() => {
		if (isMounted && user.registeredUser) {
			saveTokenCookie(token);
			history.push("/decisions");
		}
	}, [user]);

	const onChange = (attributeName: string, value: string) => {
		setSignUpRequest({ ...signUpRequest, [attributeName]: value });
	};
//TODO ask to save decision after login

	return (
		<div className={classes.divMain}>
			<Grid container justify="center">
				<Paper className={classes.paper} elevation={2} key="mainPaper">
					<Grid
						container
						justify="center"
						alignItems="center"
						spacing={0}
						className={classes.gridContainer}
					>
						<Grid item xs={12} className={classes.TitleGridItem}>
							<Typography
								variant="h4"
								className={classes.gridItem_textField}
								gutterBottom
							>
								SIGN UP
							</Typography>
						</Grid>
						<Grid item xs={12} className={classes.gridItem_textField}>
							<TextField
								id="outlined-email-input"
								name="username"
								error={signUpErrors.username != null && signUpErrors.username !==""}
								helperText={signUpErrors.username}
								value={signUpRequest.username}
								onChange={(event) =>
									setSignUpRequest({
										...signUpRequest,
										username: event.target.value,
									})
								}
								label="Email"
								type="email"
								autoComplete="email"
								margin="normal"
								variant="outlined"
								required
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12} className={classes.gridItem_textField}>
							<TextField
								id="outlined-fullName-input"
								name="fullName"
								error={signUpErrors.fullName != null && signUpErrors.fullName !==""}
								helperText={signUpErrors.fullName}
								value={signUpRequest.fullName}
								onChange={(event) =>
									setSignUpRequest({
										...signUpRequest,
										fullName: event.target.value,
									})
								}
								label="Full Name"
								type="text"
								margin="normal"
								variant="outlined"
								required
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12} className={classes.gridItem_textField}>
							<TextField
								id="outlined-password-input"
								name="password"
								error={signUpErrors.password != null && signUpErrors.password !==""}
								helperText={signUpErrors.password}
								value={signUpRequest.password}
								onChange={(event) =>
									setSignUpRequest({
										...signUpRequest,
										password: event.target.value,
									})
								}
								label="Password"
								type={"password"}
								autoComplete="password"
								margin="normal"
								variant="outlined"
								required
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12} className={classes.textField_password}>
							<TextField
								id="outlined-confirmPassword-input"
								name="confirmPassword"
								error={signUpErrors.confirmPassword != null && signUpErrors.confirmPassword !==""}
								helperText={signUpErrors.confirmPassword}
								value={signUpRequest.confirmPassword}
								onChange={(event) =>
									setSignUpRequest({
										...signUpRequest,
										confirmPassword: event.target.value,
									})
								}
								label="Confirm Password"
								type={"password"}
								autoComplete="confirmPassword"
								margin="normal"
								variant="outlined"
								required
								className={classes.textField}
							/>
						</Grid>
						<Grid item xs={12} className={classes.gridItem_legalLink}>
							<Typography variant="caption" gutterBottom>
								By clicking Sign Up, you confirm that you have read and agree to
								the&nbsp;
								<Link
									style={{ cursor: "pointer" }}
									onClick={() => setShowPrivacyPolicy(true)}
								>
									Privacy Policy
								</Link>
								&nbsp;and&nbsp;
								<Link
									style={{ cursor: "pointer" }}
									onClick={() => setShowTermsAndConditions(true)}
								>
									Terms of Service
								</Link>
								.
							</Typography>
						</Grid>

						<Grid item xs={12} className={classes.button}>
							<Fab
								color="primary"
								variant="extended"
								aria-label="Sign Up"
								className={classes.textField}
								onClick={() => signUp(dispatch, signUpRequest)}
							>
								SIGN UP
							</Fab>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
			<InfoDialog
				text={LongStrings.PrivacyPolicy}
				show={showPrivacyPolicy}
				onClose={() => setShowPrivacyPolicy(false)}
			/>
			<InfoDialog
				text={LongStrings.TermsAndConditions}
				show={showTermsAndConditions}
				onClose={() => setShowTermsAndConditions(false)}
			/>
		</div>
	);
};

export default SignUp;
