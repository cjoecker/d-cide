import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import {
	getDecisions,
	postDecision,
	deleteDecision,
	putDecision,
} from "../../services/redux/actionsAndSlicers/DecisionsActions";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TwoButtonsDialog from "../../components/TwoButtonsDialog";
import ReactGA from "react-ga";
import IconButton from "@material-ui/core/IconButton/IconButton";
import theme from "../../muiTheme";
import {RootState} from "../../services/redux/rootReducer";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
	divMain: {
		paddingTop: theme.spacing(8),
		textAlign: "center",
	},

	TitleTypography: {
		marginTop: theme.spacing(1),
	},

	gridItem: {
		maxWidth: theme.spacing(63),
	},

	paper_decisions_newDecision: {
		marginTop: theme.spacing(0.8),
		marginBottom: theme.spacing(4),
	},

	paper_decisions: {
		marginTop: theme.spacing(0.8),
	},

	inputBase_newEntry: {
		marginRight: theme.spacing(2),
		width: "100%",
	},

	inputBase_existingItems: {
		marginRight: theme.spacing(9),
		width: "100%",
	},
});

const App: React.FC = () => {

	const [newEntry, setNewEntry] = useState("");
	const [showAskBeforeDelete, setShowAskBeforeDelete] = useState(false);
	const [componentLoaded, setComponentLoaded] = useState(false);

	const decisions = useSelector(
		(state: RootState) => state.Decisions,
		shallowEqual
	);

	const { user} = useSelector(
		(state: RootState) => state.Session,
		shallowEqual
	);

	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	useEffect(() => {
		getDecisions(dispatch);
	}, []);

	useEffect(() => {
		if(!user.registeredUser) history.push(`/decisions/${decisions[0].id}`);
	}, [decisions]);

	//TODO when to component when component is loaded

	//Refresh when redux state changes
	componentDidUpdate(prevProps, prevState, snapshot) {
		//Get Decisions
		if (prevProps.decision !== this.props.decision) {
			//Go to new decision if
			if (!this.props.security.user.registeredUser) {
				this.goToDecision(this.props.decision.decisions[0].id);
			}

			this.setState({ decisions: this.props.decision.decisions });
		}

		//Go to decision when decision created
		if (
			prevProps.decision.decisions.length !== 0 &&
			prevProps.decision.decisions.length <
				this.props.decision.decisions.length &&
			this.state.isMounted === true
		) {
			const prevSet = new Set(prevProps.decision.decisions.map((o) => o.id));
			const added = this.props.decision.decisions.filter(
				(o) => !prevSet.has(o.id)
			);

			let decisionId = added[0].id;
			this.goToDecision(decisionId);
		}
	}

	async createDecision() {
		//Exit if entry
		if (this.state.newEntry === "") return;

		const newEntry = {
			name: this.state.newEntry,
		};

		await this.props.postDecision(newEntry);

		this.setState({
			newEntry: "",
		});
	}

	deleteDecisionClick(id, name) {
		this.setState({
			showAskBeforeDelete: true,
			DeleteDecisionNum: id,
			DeleteDecisionName: name,
		});
	}

	goToDecision(id) {
		this.props.history.push(`/decisions/${id}`);
	}

	onChangeNewEntry = (event) => {
		this.setState({ newEntry: event.target.value });
	};

	onChangeDecision = (event, decisionLocal) => {
		let array = this.state.decisions;
		let objIndex = array.findIndex((obj) => obj.id === decisionLocal.id);
		array[objIndex].name = event.target.value;
		this.setState({
			decisions: array,
		});
	};

	editDecisionName(decisionLocal) {
		//Exit if entry empty
		if (decisionLocal.name === "") {
			this.deleteDecision(decisionLocal.id);
			return;
		}
		this.props.putDecision(decisionLocal);
	}

	async deleteDecision(e) {
		this.props.deleteDecision(this.state.DeleteDecisionNum);

		this.setState({
			showAskBeforeDelete: false,
			DeleteDecisionNum: "",
		});

		ReactGA.event({
			category: "Decisions",
			action: "Delete Decision",
		});
	}

	cancelDeleteDecision(e) {
		this.setState({
			showAskBeforeDelete: false,
			DeleteDecisionNum: "",
		});

		ReactGA.event({
			category: "Decisions",
			action: "Cancel Delete Decision",
		});
	}

	render() {
		const { classes } = this.props;
		const { decisions, isMounted } = this.state;

		return (
			isMounted && (
				<div className={classes.divMain}>
					<Typography
						variant="h3"
						className={classes.typography_title}
						gutterBottom
					>
						Decisions
					</Typography>
					<Grid container justify="center">
						<Grid item xs={12} className={classes.gridItem}>
							<List>
								<Paper
									elevation={2}
									key="New Entry"
									className={classes.paper_decisions_newDecision}
								>
									<ListItem>
										<InputBase
											name="newEntry"
											className={classes.inputBase_newEntry}
											placeholder="New Decision"
											value={this.state.newEntry}
											onKeyPress={(event) => {
												if (event.key === "Enter") {
													event.preventDefault();
													this.createDecision();
												}
											}}
											onChange={this.onChangeNewEntry}
											multiline
										/>
										<ListItemSecondaryAction>
											{this.state.newEntry.length > 0 ? (
												<Fab
													size="small"
													color="primary"
													aria-label="Add"
													onClick={this.createDecision}
												>
													<AddIcon />
												</Fab>
											) : null}
										</ListItemSecondaryAction>
									</ListItem>
								</Paper>
								{decisions.map((decision) => (
									<Paper
										elevation={2}
										key={decision.id}
										className={classes.paper_decisions}
									>
										<ListItem>
											<InputBase
												multiline
												className={classes.inputBase_existingItems}
												value={decision.name}
												onChange={(event) =>
													this.onChangeDecision(event, decision)
												}
												onBlur={() => this.editDecisionName(decision)}
												onKeyPress={(event) => {
													if (event.key === "Enter") {
														event.preventDefault();
														event.target.blur();
													}
												}}
											/>
											<ListItemSecondaryAction>
												<IconButton
													size="small"
													color="secondary"
													aria-label="Delete"
													onClick={() =>
														this.deleteDecisionClick(decision.id, decision.name)
													}
													style={{ marginRight: 7 }}
												>
													<DeleteIcon />
												</IconButton>
												<Fab
													size="small"
													color="primary"
													aria-label="Work on Decision"
													onClick={() => this.goToDecision(decision.id)}
												>
													<ArrowForwardIcon />
												</Fab>
											</ListItemSecondaryAction>
										</ListItem>
									</Paper>
								))}
							</List>
						</Grid>
					</Grid>
					{/*Ask before deleting*/}
					<TwoButtonsDialog
						show={this.state.showAskBeforeDelete}
						title={`Delete ${this.state.DeleteDecisionName}?`}
						message="Your decision will be permanently deleted. This cannot be undone."
						primaryButtonText="Delete it"
						secondaryButtonText="Cancel"
						handlePrimary={(e) => this.deleteDecision(e)}
						handleSecondary={(e) => this.cancelDeleteDecision(e)}
					/>
				</div>
			)
		);
	}
}

export default Decisions