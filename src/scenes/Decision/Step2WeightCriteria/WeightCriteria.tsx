import React, {useEffect, useMemo, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Fade from '@material-ui/core/Fade';
import {makeStyles} from '@material-ui/core/styles';

import {HelpOutlineRounded} from '@material-ui/icons';
import * as LongStrings from '../../../constants/InfoDialogTexts';
import InfoDialog from '../../../components/InfoDialog';
import {RootState} from '../../../services/redux/rootReducer';
import WeightedCriteriaSlice, {
	WeightedCriteriaType,
} from '../../../services/redux/actionsAndSlicers/WeightCriteriaSlice';
import ComponentsTooltip from '../../../components/ComponentsTooltip';
import shuffleArray from '../../../services/shuffleArray';

const useStyles = makeStyles(theme => ({
	divMain: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5.5),
		textAlign: 'center',
		alignContent: 'center',
	},

	title: {
		paddingBottom: theme.spacing(1.5),
	},

	infoButton: {
		marginTop: theme.spacing(1.5),
		bottom: theme.spacing(1),
		left: theme.spacing(1.5),
	},

	paper: {
		padding: theme.spacing(1),
		marginBottom: theme.spacing(2),
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
		width: '100%',
	},

	gridItemCriteria: {
		minWidth: theme.spacing(40),
		maxWidth: theme.spacing(50),
		display: 'flex',
		alignItems: 'center',
	},

	gridItemCriteriaText: {
		marginTop: theme.spacing(0.5),
	},

	unselectableText: {
		userSelect: 'none',
	},

	sliderMarks: {
		height: 8,
		width: 2,
		marginTop: -3,
		backgroundColor: theme.palette.primary.main,
	},

	gridItemSlider: {
		marginTop: theme.spacing(-2.5),
		marginBottom: theme.spacing(-1),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},

	gridItemSliderInfo: {
		marginTop: theme.spacing(-2.5),
	},
}));

type Props = {
	hidden: boolean;
};

const WeightCriteria: React.FC<Props> = (props: Props) => {
	const {hidden} = props;

	const [showInfo, setShowInfo] = useState(false);

	const selectionCriteria = useSelector((state: RootState) => state.OptionsAndCriteria.selectionCriteria, shallowEqual);
	const weightedCriteria = useSelector((state: RootState) => state.WeightedCriteria, shallowEqual);

	const classes = useStyles();
	const dispatch = useDispatch();

	const sliderMarks = [
		{
			value: -66.6,
		},
		{
			value: -33.3,
		},
		{
			value: 0,
		},
		{
			value: 33.3,
		},
		{
			value: 66.6,
		},
	];

	useEffect(() => {
		if (!hidden) createWeightedCriteria();
	}, [hidden, selectionCriteria]);

	const onChange = (event: React.BaseSyntheticEvent, value: number, itemLocal: WeightedCriteriaType) => {
		weightedCriteria.forEach(criteria => {
			if (criteria.id === itemLocal.id)
				dispatch(WeightedCriteriaSlice.actions.updateWeightedCriteria({...criteria, weight: value}));
		});
	};

	//TODO improve scrolling from slider after it is implemented in Material-UI - Check also Rate options!
	// https://github.com/mui-org/material-ui/issues/20990

	//TODO remove tabIndex={-1} from all info boxes when this ticket is solved
	//	https://github.com/oliviertassinari/react-swipeable-views/issues/533

	const createWeightedCriteria = () => {
		let newWeightedCriteria: WeightedCriteriaType[] = [];

		let id = Math.max(...weightedCriteria.map(object => object.id), 0) + 1;

		for (let i = 0; i < selectionCriteria.length; i += 1) {
			for (let j = i + 1; j < selectionCriteria.length; j += 1) {
				const existingWeightedCriteria = weightedCriteria.find(
					weightedCriteriaObj =>
						(weightedCriteriaObj.selectionCriteria1Id === selectionCriteria[i].id &&
							weightedCriteriaObj.selectionCriteria2Id === selectionCriteria[j].id) ||
						(weightedCriteriaObj.selectionCriteria1Id === selectionCriteria[j].id &&
							weightedCriteriaObj.selectionCriteria2Id === selectionCriteria[i].id)
				);

				newWeightedCriteria = [
					...newWeightedCriteria,
					{
						id,
						weight: existingWeightedCriteria != null ? existingWeightedCriteria.weight : 0,
						selectionCriteria1Id: selectionCriteria[i].id,
						selectionCriteria2Id: selectionCriteria[j].id,
					},
				];

				id += 1;
			}
		}
		dispatch(WeightedCriteriaSlice.actions.setWeightedCriteria(shuffleArray(newWeightedCriteria)));
	};

	const getSelectionCriteriaName = (selectionCriteriaId: number) => {
		const FoundSelectionCriteria = selectionCriteria.find(obj => obj.id === selectionCriteriaId);
		return FoundSelectionCriteria == null ? '' : FoundSelectionCriteria.name;
	};

	const getWeightInfoText = (weight: number, selectionCriteria1Id: number, selectionCriteria2Id: number): string => {
		const selectionCriteria1Name = getSelectionCriteriaName(selectionCriteria1Id);
		const selectionCriteria2Name = getSelectionCriteriaName(selectionCriteria2Id);

		switch (true) {
			case weight < -66:
				return `${selectionCriteria1Name} is way more important than ${selectionCriteria2Name}`;
			case weight < -33:
				return `${selectionCriteria1Name} is more important than ${selectionCriteria2Name}`;
			case weight < -5:
				return `${selectionCriteria1Name} is a little more important than ${selectionCriteria2Name}`;
			case weight < 5:
				return `${selectionCriteria1Name} is as important as ${selectionCriteria2Name}`;
			case weight < 33:
				return `${selectionCriteria2Name} is a little more important than ${selectionCriteria1Name}`;
			case weight < 66:
				return `${selectionCriteria2Name} is more important than ${selectionCriteria1Name}`;
			case weight <= 100:
				return `${selectionCriteria2Name} is way more important than ${selectionCriteria1Name}`;
			default:
				return '';
		}
	};

	return (
		<div className={classes.divMain}>
			<Grid container justify='center' alignContent='center'>
				<Grid item xs={12}>
					<div className={classes.title}>
						<Typography component='span' variant='h1' gutterBottom>
							Weight Criteria
							<ComponentsTooltip title='Show help'>
								<IconButton
									data-testid='WeightCriteriaInfoButton'
									aria-label='Show weighted criteria help'
									className={classes.infoButton}
									onClick={() => setShowInfo(true)}
									tabIndex={hidden ? -1 : 0}
								>
									<HelpOutlineRounded />
								</IconButton>
							</ComponentsTooltip>
						</Typography>
					</div>
				</Grid>
				{!hidden &&
					weightedCriteria.map((criteria, index) => (
						<Grid item xs={6} className={classes.gridItemCriteria} key={criteria.id}>
							<Paper elevation={1} className={classes.paper}>
								<Grid container spacing={2} alignItems='center'>
									<Grid item xs={6} className={classes.gridItemCriteriaText}>
										<Typography
											className={classes.unselectableText}
											component='span'
											data-testid={`textSlider${index}CriteriaLeft`}
											variant='body1'
										>
											{getSelectionCriteriaName(criteria.selectionCriteria1Id)}
										</Typography>
									</Grid>
									<Grid item xs={6} className={classes.gridItemCriteriaText}>
										<Typography
											className={classes.unselectableText}
											component='span'
											data-testid={`textSlider${index}CriteriaRight`}
											variant='body1'
										>
											{getSelectionCriteriaName(criteria.selectionCriteria2Id)}
										</Typography>
									</Grid>
									<Grid item xs={12} zeroMinWidth className={classes.gridItemSlider}>
										<Slider
											aria-label={`Weight ${getSelectionCriteriaName(
												criteria.selectionCriteria1Id
											)} and ${getSelectionCriteriaName(criteria.selectionCriteria2Id)}. Slider value: ${criteria.weight}`}
											data-testid={`slider${index}`}
											classes={{
												mark: classes.sliderMarks,
												markActive: classes.sliderMarks,
											}}
											value={criteria.weight}
											min={-100}
											max={100}
											step={1}
											marks={sliderMarks}
											onChange={(event, value) => onChange(event, value as number, criteria)}
										/>
									</Grid>
									<Grid item xs={12} className={classes.gridItemSliderInfo}>
										<Typography
											className={classes.unselectableText}
											component='span'
											data-testid={`infoTextSlider${index}`}
											variant='caption'
										>
											{getWeightInfoText(criteria.weight, criteria.selectionCriteria1Id, criteria.selectionCriteria2Id)}
										</Typography>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					))}
			</Grid>
			<InfoDialog text={LongStrings.WeightCriteriaInfo} show={showInfo} onClose={() => setShowInfo(false)} />
		</div>
	);
};

export default WeightCriteria;
