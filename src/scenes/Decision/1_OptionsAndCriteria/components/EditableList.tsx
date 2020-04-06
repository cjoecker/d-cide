import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Fade from "@material-ui/core/Fade";
import { useParams } from "react-router-dom";
import theme from "../../../../muiTheme";
import {
	OptionAndCriteria,
	OptionsAndCriteriaKeys,
} from "../../../../services/redux/OptionsAndCriteriaSlice";
import {
	deleteOptionsAndCriteria,
	editOptionsAndCriteria,
	getOptionsAndCriteria,
	postOptionsAndCriteria,
} from "../../../../services/redux/OptionsAndCriteriaActions";
import { RootState } from "../../../../services/redux/rootReducer";

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
}

const EditableList: React.FC<Props> = (props: Props) => {
	const { decisionId } = useParams();

	const [newEntry, setNewEntry] = useState("");
	const [items, setItems] = useState<OptionAndCriteria[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const importedItems = useSelector(
		(state: RootState) => state.OptionsAndCriteria[props.itemsKey],
		shallowEqual
	);
	const animationDelay = 100;

	const classes = useStyles();
	const dispatch = useDispatch();

	//TODO alerts needs to be created here

	useEffect(() => {
		getOptionsAndCriteria(dispatch, decisionId, props.itemsKey, false);
	}, []);

	const stopItemsAnimation = (): (() => void) => {

		const timer = setTimeout(
			() => setIsLoaded(true),
			(importedItems.length + 1) * animationDelay
		);
		return (): void => clearTimeout(timer);
	};

	useEffect(() => {
		setItems(importedItems);

		if (!isLoaded && importedItems.length !== 0) stopItemsAnimation();
	}, [importedItems]);

	const onCreateItem = (): void => {
		if (newEntry === "") return;

		postOptionsAndCriteria(dispatch, decisionId, props.itemsKey, newEntry);

		//TODO check if new entry is null even if service was not working
		setNewEntry("");
	};

	const onDeleteItem = (itemId: number): void => {
		if (newEntry !== "")
			deleteOptionsAndCriteria(dispatch, decisionId, props.itemsKey, itemId);
	};

	const onChangeItem = (event, index: number): void => {
		const itemsLocal = [...items];
		itemsLocal[index].name = event.target.value;
		setItems(itemsLocal);
	};

	const onLeaveItem = (itemLocal: OptionAndCriteria): void => {
		if (itemLocal.name !== "")
			editOptionsAndCriteria(dispatch, decisionId, props.itemsKey, itemLocal);
		else
			deleteOptionsAndCriteria(
				dispatch,
				decisionId,
				props.itemsKey,
				itemLocal.id
			);
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
							onKeyPress={(event): void => {
								if (event.key === "Enter") {
									event.preventDefault();
									onCreateItem();
								}
							}}
							onChange={(event): void => setNewEntry(event.target.value)}
							multiline
						/>

						<ListItemSecondaryAction>
							<IconButton
								test-data="button-add-item"
								aria-label="Add"
								className={classes.paperButtons}
								onClick={(): void => onCreateItem()}
							>
								<AddIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</Paper>
				{items.map((item, index) => (
					<Fade
						in
						style={{
							transitionDelay: `${index * (isLoaded ? 0 : animationDelay)}ms`,
						}}
						key={item.id}
					>
						<Paper className={classes.paperItems} elevation={2}>
							<ListItem>
								<InputBase
									className={classes.inputBase}
									value={item.name}
									onChange={(event): void => onChangeItem(event, index)}
									onBlur={(): void => onLeaveItem(item)}
									multiline
									onKeyDown={(event): void => {
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
										onClick={(): void => deleteOptionsAndCriteria(dispatch, decisionId, props.itemsKey, item.id)}
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
