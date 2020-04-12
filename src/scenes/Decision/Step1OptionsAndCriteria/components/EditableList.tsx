import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlineRounded";
import AddIcon from "@material-ui/icons/AddRounded";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Fade from "@material-ui/core/Fade";
import { useParams } from "react-router-dom";
import theme from "../../../../muiTheme";
import {
	OptionAndCriteria,
	OptionsAndCriteriaKeys,
} from "../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice";
import {
	deleteOptionsAndCriteria,
	editOptionsAndCriteria,
	getOptionsAndCriteria,
	postOptionsAndCriteria,
} from "../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaActions";
import { RootState } from "../../../../services/redux/rootReducer";
import { getWeightedCriteria } from "../../../../services/redux/actionsAndSlicers/WeightCriteriaActions";
import { Grow } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles({
	divMain: {
		minWidth: theme.spacing(37),
	},

	paperTitle: {
		marginBottom: theme.spacing(2),
		marginRight: theme.spacing(1.5),
		marginLeft: theme.spacing(1.5),
	},

	paperItems: {
		marginTop: theme.spacing(0.5),
		marginRight: theme.spacing(1.5),
		marginLeft: theme.spacing(1.5),
	},

	paperButtons: {
		marginRight: -theme.spacing(1.5),
	},

	inputBase: {
		marginRight: theme.spacing(2),
		width: "100%",
		wordWrap: "break-word",
	},
});

interface Props {
	itemsKey: OptionsAndCriteriaKeys;
	hidden: boolean;
}

const EditableList: React.FC<Props> = (props: Props) => {
	const { decisionId } = useParams();
	const { hidden, itemsKey } = props;

	const [newEntry, setNewEntry] = useState("");
	const [localItems, setLocalItems] = useState<OptionAndCriteria[]>([]);
	const [stopAnimation, setStopAnimation] = useState(false);
	const items = useSelector(
		(state: RootState) => state.OptionsAndCriteria[itemsKey],
		shallowEqual
	);

	const animationDelay = 100;

	const classes = useStyles();
	const dispatch = useDispatch();

	//TODO alerts needs to be created here

	useEffect(() => {
		if (!hidden)
			getOptionsAndCriteria(dispatch, decisionId, itemsKey, false);
		else {
			setLocalItems([]);
			setStopAnimation(false);
		}
	}, [hidden]);

	useEffect(() => {
		if (items.length !== localItems.length && !hidden)
			setLocalItems(items);
	}, [items]);

	const onCreateItem = () => {
		if (newEntry === "") return;

		postOptionsAndCriteria(dispatch, decisionId, itemsKey, newEntry);

		//TODO check if new entry is null even if service was not working
		setNewEntry("");
	};

	const onChangeItem = (event, itemId: number) => {
		setLocalItems(
			localItems.map((item) =>
				item.id === itemId ? { ...item, name: event.target.value } : item
			)
		);
	};

	const onLeaveItem = (itemLocal: OptionAndCriteria) => {
		if (itemLocal.name !== "")
			editOptionsAndCriteria(dispatch, decisionId, itemsKey, itemLocal);
		else
			deleteOptionsAndCriteria(
				dispatch,
				decisionId,
				itemsKey,
				itemLocal.id
			);
	};

	const endOfAnimation = (index) => {
		if (index === localItems.length) {
			setStopAnimation(true);
		}
	};

	return (
		<div className={classes.divMain}>
			<List>
				<Paper className={classes.paperTitle} elevation={2} key="NewEntry">
					<ListItem>
						<InputBase
							data-testid="input-base"
							className={classes.inputBase}
							placeholder="New Entry"
							value={newEntry}
							onKeyPress={(event) => {
								if (event.key === "Enter") {
									event.preventDefault();
									onCreateItem();
								}
							}}
							onChange={(event) => setNewEntry(event.target.value)}
							multiline
						/>

						<ListItemSecondaryAction>
							<IconButton
								test-data="button-add-item"
								aria-label="Add"
								className={classes.paperButtons}
								onClick={() => onCreateItem()}
							>
								<AddIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</Paper>

				{localItems.map((item, index) => (
					<Fade
						in
						style={{
							transitionDelay: `${
								index * (stopAnimation ? 0 : animationDelay)
							}ms`,
						}}
						timeout={500}
						onEntered={() => endOfAnimation(index)}
						key={item.id}
					>
						<Paper className={classes.paperItems} elevation={2}>
							<ListItem>
								<InputBase
									className={classes.inputBase}
									value={item.name}
									onChange={(event) => onChangeItem(event, item.id)}
									onBlur={() => onLeaveItem(item)}
									multiline
									onKeyDown={(event) => {
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
										onClick={() =>
											deleteOptionsAndCriteria(
												dispatch,
												decisionId,
												itemsKey,
												item.id
											)
										}
										className={classes.paperButtons}
									>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						</Paper>
					</Fade>
				))}
			</List>
		</div>
	);
};

export default EditableList;
