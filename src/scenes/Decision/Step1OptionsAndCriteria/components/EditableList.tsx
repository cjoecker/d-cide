import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import Paper from '@material-ui/core/Paper';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Fade from '@material-ui/core/Fade';
import {Box, Input} from '@material-ui/core';
import ReactGA from 'react-ga';
import Grid from '@material-ui/core/Grid';
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
import ComponentsTooltip from '../../../../components/ComponentsTooltip';

const useStyles = makeStyles({
	divMain: {
		minWidth: theme().spacing(37),
	},

	paperTitle: {
		margin: theme().spacing(2, 1, 2, 1),
	},

	paperItems: {
		margin: theme().spacing(0.5, 1, 0, 1),
	},

	editButton: {
		marginRight: theme().spacing(-1),
	},

	deleteButton: {
		marginRight: theme().spacing(-1.5),
	},

	inputBase: {
		margin: theme().spacing(0.5, 1, 1, 2),
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
	const [itemsType, setItemsType] = useState('');
	const items = useSelector((state: RootState) => state.OptionsAndCriteria[itemsKey], shallowEqual);

	const animationDelay = 100;

	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (itemsKey === OptionsAndCriteriaKeys.decisionOptions) setItemsType('Decision options');
		else setItemsType('Selection criteria');

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
			<Grid container justify='center' alignContent='center'>
				<Grid item xs={12}>
					<Paper className={classes.paperTitle} elevation={2} key='NewEntry'>
						<Box display='flex' alignItems='center'>
							<Box width='100%' mr={1}>
								<ComponentsTooltip title='Write new entry'>
									<Input
										inputProps={{
											'data-testid': 'entryInput',
											tabIndex: hidden ? -1 : 0,
											'aria-label': `New ${itemsType}`,
										}}
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
								</ComponentsTooltip>
							</Box>
							<Box minWidth={theme().spacing(8)}>
								<ComponentsTooltip title='Add entry'>
									<IconButton
										data-testid='addButton'
										aria-label={`Create new ${itemsType}`}
										className={classes.deleteButton}
										onClick={() => onCreateItem()}
										tabIndex={hidden ? -1 : 0}
									>
										<AddIcon />
									</IconButton>
								</ComponentsTooltip>
							</Box>
						</Box>
					</Paper>
				</Grid>
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
						<Grid item xs={12}>
							<Paper className={classes.paperItems} elevation={2}>
								<Box display='flex' alignItems='center'>
									<Box width='100%' mr={1}>
										<ComponentsTooltip title='Edit entry'>
											<Input
												inputProps={{
													'data-testid': `itemInput`,
													'aria-label': `Edit ${itemsType}`,
												}}
												className={classes.inputBase}
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
										</ComponentsTooltip>
									</Box>
									<Box minWidth={theme().spacing(8)}>
										<ComponentsTooltip title='Delete entry'>
											<IconButton
												data-testid={`deleteButton${index}`}
												aria-label={`Delete ${itemsType}`}
												onClick={() => onDeleteItem(item)}
												className={classes.deleteButton}
											>
												<DeleteIcon />
											</IconButton>
										</ComponentsTooltip>
									</Box>
								</Box>
							</Paper>
						</Grid>
					</Fade>
				))}
			</Grid>
		</div>
	);
};

export default EditableList;
