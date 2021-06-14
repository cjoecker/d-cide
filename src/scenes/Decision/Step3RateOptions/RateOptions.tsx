import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {HelpOutlineRounded} from '@material-ui/icons';
import React, {useEffect, useRef, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import ComponentsTooltip from '../../../components/ComponentsTooltip';
import InfoDialog from '../../../components/InfoDialog';
import InstructionsBox from '../../../components/InstructionsBox';
import * as LongStrings from '../../../constants/InfoDialogTexts';
import {shuffleArray} from '../../../services/arraysUtils';
import {createRatedOptions} from '../../../services/createData';
import AppSlice from '../../../services/redux/actionsAndSlicers/AppSlice';
import {OptionAndCriteria} from '../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import RatedOptionsSlice from '../../../services/redux/actionsAndSlicers/RatedOptionsSlice';
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

	infoButton: {
		marginTop: theme.spacing(1.5),
		bottom: theme.spacing(1),
		left: theme.spacing(1.5),
	},

	paper: {
		padding: theme.spacing(1),
		marginBottom: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},

	mainGridItem: {
		minWidth: theme.spacing(40),
		maxWidth: theme.spacing(50),
		marginTop: theme.spacing(1),
	},

	gridItemCriteriaTitle: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},

	gridItemOptionContainer: {
		paddingBottom: theme.spacing(1),
	},

	gridItemOptionTitle: {
		paddingLeft: theme.spacing(2),
	},

	sliderTextGridLeft: {
		paddingLeft: theme.spacing(1.8),
		paddingRight: theme.spacing(1.8),
		marginTop: theme.spacing(0.5),
		textAlign: 'left',
	},

	sliderTextGridRight: {
		paddingLeft: theme.spacing(1.8),
		paddingRight: theme.spacing(1.8),
		marginTop: theme.spacing(0.5),
		textAlign: 'right',
	},

	gridItemSlider: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},

	sliderText: {
		fontSize: 11,
		userSelect: 'none',
	},

	sliderMarks: {
		height: 8,
		width: 2,
		marginTop: -3,
		backgroundColor: theme.palette.primary.main,
	},
}));

const RateOptions: React.FC = () => {
	const [isInfoVisible, setIsInfoVisible] = useState(false);
	const [shuffledSelectionCriteria, setShuffledSelectionCriteria] = useState<OptionAndCriteria[]>([]);
	const [shuffledDecisionOptions, setShuffledDecisionOptions] = useState<OptionAndCriteria[][]>([]);
	const [areInstructionsVisible, setAreInstructionsVisible] = useState(false);
	const [instructionsText, setInstructionsText] = useState<JSX.Element | null>(null);

	const sliderRef = useRef<HTMLElement>(null);
	const paperRef = useRef<HTMLDivElement>(null);

	const {selectionCriteria, decisionOptions} = useSelector((state: RootState) => state.OptionsAndCriteria, shallowEqual);
	const {instructionsStepNum} = useSelector((state: RootState) => state.App, shallowEqual);
	const ratedOptions = useSelector((state: RootState) => state.RatedOptions, shallowEqual);

	const classes = useStyles();
	const dispatch = useDispatch();
	const theme = useTheme();

	const sliderMarks = [
		{
			value: 2,
		},
		{
			value: 26,
		},
		{
			value: 50,
		},
		{
			value: 74,
		},
		{
			value: 98,
		},
	];

	useEffectUnsafe(() => {
		dispatch(
			RatedOptionsSlice.actions.setRatedOptions(createRatedOptions(ratedOptions, decisionOptions, selectionCriteria))
		);
		setShuffledSelectionCriteria(shuffleArray(selectionCriteria));
		setShuffledDecisionOptions(shuffleDecisionOptions(decisionOptions, selectionCriteria));

		setInstructionsText(
			<div>
				<p>
					How good or bad is the 
{' '}
{selectionCriteria[0].name}
					{' in '}
					{decisionOptions[0].name}
?
				</p>
				<p>Move the slider left or right to rate it.</p>
			</div>
		);
	}, [selectionCriteria, decisionOptions]);

	useEffect(() => {
		if (instructionsStepNum === 8) {setAreInstructionsVisible(true);}
		else {setAreInstructionsVisible(false);}
	}, [instructionsStepNum]);

	const onChange = (event: React.BaseSyntheticEvent, criteriaId: number, optionId: number, score: number) => {
		ratedOptions.forEach(option => {
			if (option.selectionCriteriaId === criteriaId && option.decisionOptionId === optionId)
				{dispatch(RatedOptionsSlice.actions.updateRatedOptions({...option, score}));}
		});

		if (instructionsStepNum === 8) {dispatch(AppSlice.actions.goToInstructionsStep(9));}
	};

	const getScore = (criteriaId: number, optionId: number): number => {
		const foundRatedOption = ratedOptions.find(
			obj => obj.selectionCriteriaId === criteriaId && obj.decisionOptionId === optionId
		);

		return foundRatedOption == null ? 50 : foundRatedOption.score;
	};

	const shuffleDecisionOptions = (_decisionOptions: OptionAndCriteria[], _selectionCriteria: OptionAndCriteria[]) => {
		let newShuffledDecisionOptions: OptionAndCriteria[][] = [];

		for (let i = 0; i < _selectionCriteria.length; i += 1) {
			newShuffledDecisionOptions = [...newShuffledDecisionOptions, shuffleArray(_decisionOptions)];
		}
		return newShuffledDecisionOptions;
	};

	return (
		<div className={classes.divMain}>
			<Grid container justify='center' alignContent='center'>
				<Grid item xs={12}>
					<Typography component='span' variant='h1' gutterBottom>
						Rate Options
						<ComponentsTooltip title='Show help'>
							<IconButton
								data-testid='RateOptionsInfoButton'
								aria-label='Show rate options help'
								className={classes.infoButton}
								onClick={() => setIsInfoVisible(true)}
							>
								<HelpOutlineRounded />
							</IconButton>
						</ComponentsTooltip>
					</Typography>
				</Grid>
				{shuffledSelectionCriteria.map((criteria, criteriaIndex) => (
					<Fade in timeout={500} style={{transitionDelay: `${criteriaIndex * 100}ms`}} key={criteria.id}>
						<Grid item xs={6} className={classes.mainGridItem} key={criteria.id}>
							<Paper className={classes.paper} elevation={1} key={criteria.id}>
								<div>
									<Grid container>
										<Grid item xs={12} className={classes.gridItemCriteriaTitle}>
											<Typography component='span' variant='h2'>
												{wrapWord(criteria.name, 25)}
											</Typography>
										</Grid>
										{shuffledDecisionOptions[criteriaIndex].map((option, optionIndex) => (
											<Grid
												container
												justify='center'
												alignItems='center'
												className={classes.gridItemOptionContainer}
												key={option.id}
											>
												<Grid item xs={4} className={classes.gridItemOptionTitle}>
													<Typography component='span' variant='body1'>
														{wrapWord(option.name, 12)}
													</Typography>
												</Grid>
												<Grid item xs={8} ref={criteriaIndex === 0 && optionIndex === 0 ? paperRef : null}>
													<Grid container>
														<Grid item xs={6} className={classes.sliderTextGridLeft}>
															<Typography variant='caption' className={classes.sliderText}>
																Bad
															</Typography>
														</Grid>
														<Grid item xs={6} className={classes.sliderTextGridRight}>
															<Typography variant='caption' className={classes.sliderText}>
																Good
															</Typography>
														</Grid>
														<Grid
															item
															xs={12}
															className={classes.gridItemSlider}
															style={{marginTop: isMobile ? theme.spacing(-2.7) : theme.spacing(-2)}}
														>
															<Slider
																data-testid={`slider${criteriaIndex}${optionIndex}`}
																classes={{
																	mark: classes.sliderMarks,
																	markActive: classes.sliderMarks,
																}}
																value={getScore(criteria.id, option.id)}
																min={0}
																max={100}
																step={1}
																ref={criteriaIndex === 0 && optionIndex === 0 ? sliderRef : null}
																marks={sliderMarks}
																onChange={(event, value) => onChange(event, criteria.id, option.id, value as number)}
																aria-label={`Rate ${criteria.name} for ${option.name}. Slider value: ${getScore(
																	criteria.id,
																	option.id
																)}`}
															/>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										))}
									</Grid>
								</div>
							</Paper>
						</Grid>
					</Fade>
				))}
			</Grid>
			{paperRef.current && (
				<InstructionsBox
					show={areInstructionsVisible}
					anchor={sliderRef.current}
					width={paperRef.current.offsetWidth}
					customText={instructionsText}
				/>
			)}
			<InfoDialog text={LongStrings.OptionsRatingInfo} isVisible={isInfoVisible} onClose={() => setIsInfoVisible(false)} />
		</div>
	);
};

export default RateOptions;
