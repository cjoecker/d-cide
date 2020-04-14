import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
	getDecisions,
	postDecision,
	changeDecision, deleteDecision, newDecision,
} from "../../services/redux/actionsAndSlicers/DecisionsActions";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TwoButtonsDialog from "../../components/TwoButtonsDialog";
import IconButton from "@material-ui/core/IconButton/IconButton";
import theme from "../../muiTheme";
import {RootState} from "../../services/redux/rootReducer";
import {useHistory} from "react-router-dom";
import {Decision} from "../../services/redux/actionsAndSlicers/DecisionsSlice";

const useStyles = makeStyles({
	divMain: {
		paddingTop: theme.spacing(8),
		textAlign: "center",
	},

	title: {
		marginTop: theme.spacing(1),
	},

	gridItem: {
		maxWidth: theme.spacing(63),
	},

	paperNewDecision: {
		marginTop: theme.spacing(0.8),
		marginBottom: theme.spacing(4),
	},

	paperDecisions: {
		marginTop: theme.spacing(0.8),
	},

	newEntry: {
		marginRight: theme.spacing(2),
		width: "100%",
	},

	inputBaseExistingItems: {
		marginRight: theme.spacing(9),
		width: "100%",
	},
});

const Decisions: React.FC = () => {

	const [componentLoaded, setComponentLoaded] = useState(false);
	const [newEntry, setNewEntry] = useState("");
	const [showAskBeforeDelete, setShowAskBeforeDelete] = useState(false);
	const [decisionToBeDeleted, setDecisionToBeDeleted] = useState<Decision>({id: 0, name:""});
	const [localDecisions, setLocalDecisions] = useState<Decision[]>([]);

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
		setComponentLoaded(true)
	}, []);

	useEffect(() => {
		if(componentLoaded && !user.registeredUser) history.push(`/decisions/${decisions[0].id}`);
		setLocalDecisions(decisions);
	}, [decisions]);

	//TODO go to the decision, when new decision is created
		// if (
		// 	prevProps.decision.decisions.length !== 0 &&
		// 	prevProps.decision.decisions.length <
		// 		this.props.decision.decisions.length &&
		// 	this.state.isMounted === true
		// ) {
		// 	const prevSet = new Set(prevProps.decision.decisions.map((o) => o.id));
		// 	const added = this.props.decision.decisions.filter(
		// 		(o) => !prevSet.has(o.id)
		// 	);
		//
		// 	let decisionId = added[0].id;
		// 	this.goToDecision(decisionId);
		// }


	const createDecision = () => {
		//Exit if entry
		if (newEntry === "") return;

		const newDecision: newDecision = {
			name: newEntry,
		};

		postDecision(dispatch, newDecision);

		setNewEntry("");
	}

	const onChangeDecision = (event, decisionId: number) => {
		setLocalDecisions(
			localDecisions.map((decision) =>
				decision.id === decisionId ? { ...decision, name: event.target.value } : decision
			)
		);
	};

	const onLeaveDecision = (decision: Decision) => {
		if (decision.name !== "")
			changeDecision(dispatch, decision);
		else
			showDeleteDialog(decision)
	};

	const onDeleteDecision = () => {
		deleteDecision(dispatch, decisionToBeDeleted)
		setShowAskBeforeDelete(false);
	};


	const showDeleteDialog = (decision: Decision)  => {
		setShowAskBeforeDelete(true);
		setDecisionToBeDeleted(decision);
	}

		return (
				<div className={classes.divMain}>
					<Typography
						variant="h3"
						className={classes.title}
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
									className={classes.paperNewDecision}
								>
									<ListItem>
										<InputBase
											name="newEntry"
											className={classes.newEntry}
											placeholder="New Decision"
											value={newEntry}
											onKeyPress={(event) => {
												if (event.key === "Enter") {
													event.preventDefault();
													createDecision();
												}
											}}
											onChange={(event) => setNewEntry(event.target.value)}
											multiline
										/>
										<ListItemSecondaryAction>
											{newEntry.length > 0 ? (
												<Fab
													size="small"
													color="primary"
													aria-label="Add"
													onClick={createDecision}
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
										className={classes.paperDecisions}
									>
										<ListItem>
											<InputBase
												multiline
												className={classes.inputBaseExistingItems}
												value={decision.name}
												onChange={(event) =>
													onChangeDecision(event, decision)
												}
												onBlur={() => onLeaveDecision(decision)}
												onKeyPress={(event) => {
													if (event.key === "Enter") {
														event.preventDefault();
														if (document.activeElement instanceof HTMLElement) {
															document.activeElement.blur();
														}
													}
												}}
											/>
											<ListItemSecondaryAction>
												<IconButton
													size="small"
													color="secondary"
													aria-label="Delete"
													onClick={() =>
														showDeleteDialog(decision)
													}
													style={{ marginRight: 7 }}
												>
													<DeleteIcon />
												</IconButton>
												<Fab
													size="small"
													color="primary"
													aria-label="Work on Decision"
													onClick={() => history.push(`/decisions/${decision.id}`)}
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

					<TwoButtonsDialog
						show={showAskBeforeDelete}
						title={`Delete ${decisionToBeDeleted.name}?`}
						message="Your decision will be permanently deleted. This cannot be undone."
						primaryButtonText="Delete it"
						secondaryButtonText="Cancel"
						onClickPrimary={onDeleteDecision}
						onClickSecondary={() => setShowAskBeforeDelete(false)}
					/>
				</div>
		);
}

export default Decisions
