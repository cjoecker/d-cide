import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {HelpOutlineRounded} from '@material-ui/icons';
import React, {useEffect, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import ComponentsTooltip from '../../../components/ComponentsTooltip';
import InfoDialog from '../../../components/InfoDialog';
import InstructionsBox from '../../../components/InstructionsBox';
import * as LongStrings from '../../../constants/InfoDialogTexts';
import {shuffleArray} from '../../../services/arraysUtils';
import {createWeightedCriteria} from '../../../services/createData';
import AppSlice from '../../../services/redux/actionsAndSlicers/AppSlice';
import WeightedCriteriaSlice, {
	WeightedCriteriaType,
} from '../../../services/redux/actionsAndSlicers/WeightCriteriaSlice';
import {RootState} from '../../../services/redux/rootReducer';
import {useEffectUnsafe} from '../../../services/unsafeHooks';
import wrapWord from '../../../services/wrapWord';

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

const WeightCriteria: React.FC = () => {
	const [isInfoVisible, setIsInfoVisible] = useState(false);
	const [areInstructionsVisible, setAreInstructionsVisible] = useState(false);
	const sliderRef = useRef<HTMLElement>(null);
	const paperRef = useRef<HTMLElement>(null);

	const selectionCriteria = useSelector((state: RootState) => state.OptionsAndCriteria.selectionCriteria, shallowEqual);
	const weightedCriteria = useSelector((state: RootState) => state.WeightedCriteria, shallowEqual);
	const {instructionsStepNum} = useSelector((state: RootState) => state.App, shallowEqual);

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

	useEffectUnsafe(() => {
		dispatch(
			WeightedCriteriaSlice.actions.setWeightedCriteria(
				shuffleArray(createWeightedCriteria(weightedCriteria, selectionCriteria))
			)
		);
	}, [selectionCriteria]);

	useEffect(() => {
		if (instructionsStepNum === 6) {setAreInstructionsVisible(true);}
		else {setAreInstructionsVisible(false);}
	}, [instructionsStepNum]);

	const handleChange = (event: React.BaseSyntheticEvent, value: number, itemLocal: WeightedCriteriaType) => {
		weightedCriteria.forEach(criteria => {
			if (criteria.id === itemLocal.id)
				{dispatch(WeightedCriteriaSlice.actions.updateWeightedCriteria({...criteria, weight: value}));}
		});

		if (instructionsStepNum === 6) {dispatch(AppSlice.actions.goToInstructionsStep(7));}
	};

	const getSelectionCriteriaName = (selectionCriteriaId: number) => {
		const FoundSelectionCriteria = selectionCriteria.find(obj => obj.id === selectionCriteriaId);
		return FoundSelectionCriteria == null ? '' : wrapWord(FoundSelectionCriteria.name, 25);
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
									onClick={() => setIsInfoVisible(true)}
								>
									<HelpOutlineRounded />
								</IconButton>
							</ComponentsTooltip>
						</Typography>
					</div>
				</Grid>
				{weightedCriteria.map((criteria, index) => (
					<Grid item xs={6} className={classes.gridItemCriteria} key={criteria.id}>
						<Paper elevation={1} className={classes.paper} ref={index === 0 ? paperRef : null}>
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
										aria-label={`Weight ${getSelectionCriteriaName(criteria.selectionCriteria1Id)} and ${getSelectionCriteriaName(
											criteria.selectionCriteria2Id
										)}. Slider value: ${criteria.weight}`}
										data-testid={`slider${index}`}
										classes={{
											mark: classes.sliderMarks,
											markActive: classes.sliderMarks,
										}}
										ref={index === 0 ? sliderRef : null}
										value={criteria.weight}
										min={-100}
										max={100}
										step={1}
										marks={sliderMarks}
										onChange={(event, value) => handleChange(event, value as number, criteria)}
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
			{paperRef.current && (
				<InstructionsBox
					show={areInstructionsVisible}
					anchor={sliderRef.current}
					width={paperRef.current.offsetWidth}
				/>
			)}

			<InfoDialog
				text={LongStrings.WeightCriteriaInfo}
				isVisible={isInfoVisible}
				onClose={() => setIsInfoVisible(false)}
			/>
		</div>
	);
};

export default WeightCriteria;
