import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import Paper from '@material-ui/core/Paper';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Fade from '@material-ui/core/Fade';
import {TextField, Tooltip} from '@material-ui/core';
import ReactGA from 'react-ga';
import theme from '../../../../muiTheme';
import OptionsAndCriteriaSlice, {
	OptionAndCriteria,
	OptionsAndCriteriaKeys,
} from '../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import {RootState} from '../../../../services/redux/rootReducer';
import AppSlice from '../../../../services/redux/actionsAndSlicers/AppSlice';
import {AlertType} from '../../../../constants/Alerts';
import {
	predefinedDecisionOptions,
	predefinedSelectionCriteria,
} from '../../../../constants/PredifinedOptionsAndCriteria';
import ButtonsTooltip from '../../../../components/ButtonsTooltip';

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
		cursor: 'pointer',
	},

	editButton: {
		marginRight: theme.spacing(-1),
	},

	deleteButton: {
		marginRight: theme.spacing(-1.5),
	},

	inputBase: {
		marginRight: theme.spacing(2),
		width: '100%',
		wordWrap: 'break-word',
	},
});

type Props = {
	itemsKey: OptionsAndCriteriaKeys;
	notEnoughItemsAlert: AlertType;
	hidden: boolean;
};

const EditableList: React.FC<Props> = (props: Props) => {
	const {hidden, notEnoughItemsAlert, itemsKey} = props;

	const [didMount, setDidMount] = useState(false);
	const [newEntry, setNewEntry] = useState('');
	const [localItems, setLocalItems] = useState<OptionAndCriteria[]>([]);
	const [stopAnimation, setStopAnimation] = useState(false);
	const [itemsType, setItemsKeyForAnalytics] = useState('');
	const items = useSelector((state: RootState) => state.OptionsAndCriteria[itemsKey], shallowEqual);

	const animationDelay = 100;

	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (itemsKey === OptionsAndCriteriaKeys.decisionOptions) setItemsKeyForAnalytics('Decision options');
		else setItemsKeyForAnalytics('Selection criteria');

		return () => {
			dispatch(AppSlice.actions.deleteAlert(notEnoughItemsAlert));
		};
	}, []);

	useEffect(() => {
		if (!hidden) {
			if (items.length === 0) createStartItems();
			setLocalItems(items);
			setDidMount(true);
		} else {
			setLocalItems([]);
			setStopAnimation(false);
			dispatch(AppSlice.actions.deleteAlert(notEnoughItemsAlert));

			ReactGA.event({
				category: itemsType,
				action: 'Items number',
				value: items.length,
			});
		}
	}, [hidden]);

	useEffect(() => {
		if (items.length !== localItems.length && !hidden && didMount) {
			clearNewEntryWhenCreated();
			manageNotEnoughItemsAlerts();
		}

		if (!hidden && didMount) {
			setLocalItems(items);
		}

		if (items.length === 0 && didMount) {
			manageNotEnoughItemsAlerts();
		}
	}, [items]);

	const onCreateItem = () => {
		if (newEntry === '') return;

		const newItem: OptionAndCriteria = {
			id: Math.max(...items.map(object => object.id), 0) + 1,
			name: newEntry,
			score: 0,
		};

		ReactGA.event({
			category: itemsType,
			action: `Create ${itemsType}`,
		});

		if (itemsKey === OptionsAndCriteriaKeys.decisionOptions) {
			dispatch(OptionsAndCriteriaSlice.actions.addDecisionOption(newItem));
		} else {
			dispatch(OptionsAndCriteriaSlice.actions.addSelectionCriteria(newItem));
		}
	};

	const onChangeItem = (event: React.BaseSyntheticEvent, itemId: number) => {
		setLocalItems(localItems.map(item => (item.id === itemId ? {...item, name: event.target.value} : item)));
	};

	const onLeaveItem = (itemLocal: OptionAndCriteria) => {
		if (itemLocal.name !== '') {
			ReactGA.event({
				category: itemsType,
				action: `Edit ${itemsType}`,
			});

			if (itemsKey === OptionsAndCriteriaKeys.decisionOptions)
				dispatch(OptionsAndCriteriaSlice.actions.updateDecisionOption(itemLocal));
			else dispatch(OptionsAndCriteriaSlice.actions.updateSelectionCriteria(itemLocal));
		} else {
			ReactGA.event({
				category: itemsType,
				action: `Delete ${itemsType} after empty`,
			});
			if (itemsKey === OptionsAndCriteriaKeys.decisionOptions)
				dispatch(OptionsAndCriteriaSlice.actions.deleteDecisionOption(itemLocal.id));
			else dispatch(OptionsAndCriteriaSlice.actions.deleteSelectionCriteria(itemLocal.id));
		}
	};

	const onDeleteItem = (itemLocal: OptionAndCriteria) => {
		ReactGA.event({
			category: itemsType,
			action: `Delete ${itemsType}`,
		});

		if (itemsKey === OptionsAndCriteriaKeys.decisionOptions)
			dispatch(OptionsAndCriteriaSlice.actions.deleteDecisionOption(itemLocal.id));
		else dispatch(OptionsAndCriteriaSlice.actions.deleteSelectionCriteria(itemLocal.id));
	};

	const endOfAnimation = (index: number) => {
		if (index === localItems.length) {
			setStopAnimation(true);
		}
	};

	const createStartItems = () => {
		if (itemsKey === OptionsAndCriteriaKeys.decisionOptions)
			dispatch(OptionsAndCriteriaSlice.actions.setDecisionOptions(predefinedDecisionOptions));
		else dispatch(OptionsAndCriteriaSlice.actions.setSelectionCriteria(predefinedSelectionCriteria));
	};

	const clearNewEntryWhenCreated = () => {
		if (items.length > 0 && items[0].name === newEntry) setNewEntry('');
	};

	const manageNotEnoughItemsAlerts = () => {
		if (items.length < 2) dispatch(AppSlice.actions.addAlert(notEnoughItemsAlert));
		else dispatch(AppSlice.actions.deleteAlert(notEnoughItemsAlert));
	};

	return (
		<div className={classes.divMain} data-testid={`${itemsKey}List`}>
			<List>
				<Paper className={classes.paperTitle} elevation={2} key='NewEntry'>
					<ListItem>
						<TextField
							aria-label={`New ${itemsType}`}
							inputProps={{
								'data-testid': 'entryInput',
								tabIndex: hidden ? -1 : 0,
							}}
							variant='standard'
							className={classes.inputBase}
							placeholder='New Entry'
							value={newEntry}
							onKeyPress={event => {
								if (event.key === 'Enter') {
									event.preventDefault();
									onCreateItem();
								}
							}}
							onChange={event => setNewEntry(event.target.value)}
							multiline
						/>
						<ListItemSecondaryAction>
							<ButtonsTooltip title="Create">
								<IconButton
									data-testid='addButton'
									aria-label={`Create new ${itemsType}`}
									className={classes.deleteButton}
									onClick={() => onCreateItem()}
									tabIndex={hidden ? -1 : 0}
								>
									<AddIcon />
								</IconButton>
							</ButtonsTooltip>
						</ListItemSecondaryAction>
					</ListItem>
				</Paper>

				{localItems.map((item, index) => (
					<Fade
						in
						style={{
							transitionDelay: `${index * (stopAnimation ? 0 : animationDelay)}ms`,
						}}
						timeout={500}
						onEntered={() => endOfAnimation(index)}
						key={item.id}
					>
						<Paper className={classes.paperItems} elevation={2}>
							<ListItem>
								<ButtonsTooltip title="Edit">
									<TextField
										aria-label={`Edit ${itemsType}`}
										inputProps={{
											'data-testid': `itemInput`,
										}}
										className={classes.inputBase}
										variant='standard'
										value={item.name}
										onChange={event => onChangeItem(event, item.id)}
										onBlur={() => onLeaveItem(item)}
										multiline
										onKeyDown={event => {
											if (event.key === 'Enter') {
												event.preventDefault();
												if (document.activeElement instanceof HTMLElement) {
													document.activeElement.blur();
												}
											}
										}}
									/>
								</ButtonsTooltip>
								<ListItemSecondaryAction>
									<ButtonsTooltip title="Delete">
										<IconButton
											data-testid={`deleteButton${index}`}
											aria-label={`Delete ${itemsType}`}
											onClick={() => onDeleteItem(item)}
											className={classes.deleteButton}
										>
											<DeleteIcon />
										</IconButton>
									</ButtonsTooltip>
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
