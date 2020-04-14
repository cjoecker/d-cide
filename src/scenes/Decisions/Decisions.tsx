import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DeleteIcon from "@material-ui/icons/DeleteOutlineRounded";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
	getDecisions,
	postDecision,
	changeDecision,
	deleteDecision,
	newDecision,
} from "../../services/redux/actionsAndSlicers/DecisionsActions";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TwoButtonsDialog from "../../components/TwoButtonsDialog";
import IconButton from "@material-ui/core/IconButton/IconButton";
import theme from "../../muiTheme";
import { RootState } from "../../services/redux/rootReducer";
import { useHistory } from "react-router-dom";
import { Decision } from "../../services/redux/actionsAndSlicers/DecisionsSlice";

const useStyles = makeStyles({
	divMain: {
		paddingTop: theme.spacing(7),
		textAlign: "center",
	},

	gridItemPaper: {
		maxWidth: theme.spacing(63),
	},

	decisionsNegativeMargin: {
		marginTop: -theme.spacing(1),
	},

	gridButtons: {
		maxWidth: theme.spacing(7),
		marginLeft: theme.spacing(0.5),
	},

	paperNewDecision: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},

	gridItemDecisions: {
		marginTop: theme.spacing(2),
	},

	paperButtons: {
		marginRight: -theme.spacing(1.5),
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
	const [didMount, setDidMount] = useState(false);
	const [newEntry, setNewEntry] = useState("");
	const [showAskBeforeDelete, setShowAskBeforeDelete] = useState(false);
	const [decisionToBeDeleted, setDecisionToBeDeleted] = useState<Decision>({
		id: 0,
		name: "",
	});
	const [localDecisions, setLocalDecisions] = useState<Decision[]>([]);

	const decisions = useSelector(
		(state: RootState) => state.Decisions,
		shallowEqual
	);

	const { user } = useSelector(
		(state: RootState) => state.Session,
		shallowEqual
	);

	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	useEffect(() => {
		getDecisions(dispatch);
		setDidMount(true);
	}, []);

	useEffect(() => {
		if (didMount && !user.registeredUser)
			history.push(`/decisions/${decisions[0].id}`);

		if (localDecisions.length > 0 && decisions.length > 1) {
			if (didMount && localDecisions[0].id == decisions[1].id)
				history.push(`/decisions/${decisions[0].id}`);
		}

		setLocalDecisions(decisions);
	}, [decisions]);

	const createDecision = () => {
		//Exit if entry
		if (newEntry === "") return;

		const newDecision: newDecision = {
			name: newEntry,
		};

		postDecision(dispatch, newDecision);

		setNewEntry("");
	};

	const onChangeDecision = (event, decisionId: number) => {
		setLocalDecisions(
			localDecisions.map((decision) =>
				decision.id === decisionId
					? { ...decision, name: event.target.value }
					: decision
			)
		);
	};

	const onLeaveDecision = (decision: Decision) => {
		if (decision.name !== "") changeDecision(dispatch, decision);
		else showDeleteDialog(decision);
	};

	const onDeleteDecision = () => {
		deleteDecision(dispatch, decisionToBeDeleted);
		setShowAskBeforeDelete(false);
	};

	const onDismissDeleteDecision = () => {
		setLocalDecisions(decisions);
		setShowAskBeforeDelete(false)
	};

	const showDeleteDialog = (decision: Decision) => {
		setShowAskBeforeDelete(true);
		setDecisionToBeDeleted(decision);
	};

	return (
		<div className={classes.divMain}>
			<Typography variant="h3" gutterBottom>
				Decisions
			</Typography>
			<Grid container justify="center" alignItems="center">
				<Grid item xs={11} className={classes.gridItemPaper}>
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
							</ListItem>
						</Paper>
					</List>
				</Grid>
				<Grid item xs={1} className={classes.gridButtons}>
					<Fab
						size="small"
						color="primary"
						aria-label="Add"
						onClick={createDecision}
					>
						<AddIcon />
					</Fab>
				</Grid>

				<Grid item xs={12} className={classes.gridItemDecisions}>
					{localDecisions.map((decision) => (
						<Grid container justify="center" alignItems="center" key={decision.id}>
							<Grid
								item
								xs={11}
								className={`${classes.gridItemPaper} ${classes.decisionsNegativeMargin}`}
							>
								<List>
									<Paper elevation={2} key={decision.id}>
										<ListItem>
											<InputBase
												multiline
												className={classes.inputBaseExistingItems}
												value={decision.name}
												onChange={(event) => onChangeDecision(event, decision.id)}
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
													aria-label="Delete"
													onClick={() => showDeleteDialog(decision)}
													className={classes.paperButtons}
												>
													<DeleteIcon />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									</Paper>
								</List>
							</Grid>
							<Grid
								item
								xs={1}
								className={`${classes.gridButtons} ${classes.decisionsNegativeMargin}`}
							>
								<Fab
									size="small"
									color="primary"
									aria-label="Work on Decision"
									onClick={() => history.push(`/decisions/${decision.id}`)}
								>
									<ArrowForwardIcon />
								</Fab>
							</Grid>
						</Grid>
					))}
				</Grid>
			</Grid>
			<TwoButtonsDialog
				show={showAskBeforeDelete}
				title={`Delete ${decisionToBeDeleted.name}?`}
				message="Your decision will be permanently deleted. This cannot be undone."
				primaryButtonText="Delete it"
				secondaryButtonText="Cancel"
				onClickPrimary={onDeleteDecision}
				onClickSecondary={onDismissDeleteDecision}
			/>
		</div>
	);
};

export default Decisions;
