import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Fade from "@material-ui/core/Fade";
import { useParams } from "react-router-dom";
import * as LongStrings from "../../../constants/InfoDialogTexts";
import InfoDialog from "../../../components/InfoDialog";
import { RootState } from "../../../redux/rootReducer";
import theme from "../../../muiTheme";
import { RatedOption } from "../../../redux/actionsAndSlicers/RatedOptionsSlice";
import { getRatedOptions, updateRatedOptions } from "../../../redux/actionsAndSlicers/RatedOptionsActions";
import { getOptionsAndCriteria } from "../../../redux/actionsAndSlicers/OptionsAndCriteriaActions";
import { OptionsAndCriteriaKeys } from "../../../redux/actionsAndSlicers/OptionsAndCriteriaSlice";
import { ParamTypes } from "../../../App";

const useStyles = makeStyles({
	divMain: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5.5),
		textAlign: 'center',
		alignContent: 'center',
	},

	infoButton: {
		bottom: theme.spacing(0.25),
		left: theme.spacing(1),
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

	titleGridItem: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},

	gridItemGridContainer: {
		paddingBottom: theme.spacing(2),
	},

	gridItemGridContainerTitle: {
		paddingLeft: theme.spacing(2),
	},

	sliderLeftText: {
		paddingLeft: theme.spacing(1.8),
		paddingRight: theme.spacing(1.8),
		marginTop: theme.spacing(1),
		textAlign: 'left',
	},

	sliderRightText: {
		paddingLeft: theme.spacing(1.8),
		paddingRight: theme.spacing(1.8),
		marginTop: theme.spacing(1),
		textAlign: 'right',
	},

	gridItemSlider: {
		marginTop: -theme.spacing(2),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},

	sliderMarks: {
		height: 8,
		width: 1,
		marginTop: -3,
		backgroundColor: theme.palette.primary.main,
	},

	sliderTrack: {
		opacity: 100,
	},

	emptySpace: {
		height: theme.spacing(4),
	},
});

type Props = {
	hidden: boolean;
};

const RateOptions: React.FC<Props> = (props: Props) => {
	const {decisionId} = useParams<ParamTypes>();
	const {hidden} = props;

	const [showInfo, setShowInfo] = useState(false);

	const [LocalRatedOptions, setLocalRatedOptions] = useState<RatedOption[]>([]);

	const {selectionCriteria, decisionOptions} = useSelector((state: RootState) => state.OptionsAndCriteria, shallowEqual);

	const ratedOptions = useSelector((state: RootState) => state.RatedOptions, shallowEqual);

	const classes = useStyles();
	const dispatch = useDispatch();

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

	useEffect(() => {
		if (!hidden) {
			getOptionsAndCriteria(dispatch, decisionId, OptionsAndCriteriaKeys.selectionCriteria, false);
			getOptionsAndCriteria(dispatch, decisionId, OptionsAndCriteriaKeys.decisionOptions, false);
			getRatedOptions(dispatch, decisionId);
		} else {
			setLocalRatedOptions([]);
		}
	}, [hidden]);

	useEffect(() => {
		if (ratedOptions.length !== LocalRatedOptions.length) {
			setLocalRatedOptions(ratedOptions);
		}
	}, [ratedOptions]);

	const onChange = (event: React.BaseSyntheticEvent, criteriaId: number, optionId: number, score: number) => {
		setLocalRatedOptions(
			LocalRatedOptions.map(option => {
				if (option.selectionCriteriaId === criteriaId && option.decisionOptionId === optionId) {
					return {...option, score};
				}
				return option;
			})
		);
	};

	const onChangeCommitted = (value: number, criteriaId: number, optionId: number) => {
		const FoundRatedOption = LocalRatedOptions.find(
			obj => obj.selectionCriteriaId === criteriaId && obj.decisionOptionId === optionId
		);

		updateRatedOptions(dispatch, decisionId, {
			...FoundRatedOption,
			score: value,
		});
	};

	const getScore = (criteriaId: number, optionId: number): number => {
		const FoundRatedOption = LocalRatedOptions.find(
			obj => obj.selectionCriteriaId === criteriaId && obj.decisionOptionId === optionId
		);

		return FoundRatedOption == null ? 50 : FoundRatedOption.score;
	};

	return (
		<div className={classes.divMain}>
			<Grid container justify='center' alignContent='center'>
				<Grid item xs={12}>
					<Typography variant='h5' gutterBottom>
						Rate Options
						<IconButton aria-label='Help' className={classes.infoButton} onClick={() => setShowInfo(true)}>
							<InfoIcon color='secondary' />
						</IconButton>
					</Typography>
				</Grid>
				{!hidden &&
					selectionCriteria.map((criteria, criteriaIndex) => (
						<Fade
							in
							timeout={500}
							style={{
								transitionDelay: `${criteriaIndex * 100}ms`,
							}}
						>
							<Grid item xs={6} className={classes.mainGridItem} key={criteria.id}>
								<Paper className={classes.paper} elevation={2} key={criteria.id}>
									<div>
										<Grid container>
											<Grid item xs={12} className={classes.titleGridItem}>
												<Typography variant='h6'>{criteria.name}</Typography>
											</Grid>
											{decisionOptions.map(option => (
												<Grid
													container
													justify='center'
													alignItems='center'
													className={classes.gridItemGridContainer}
													key={option.id}
												>
													<Grid item xs={4} className={classes.gridItemGridContainerTitle}>
														<Typography variant='body1'>{option.name}</Typography>
													</Grid>
													<Grid item xs={8}>
														<Grid container>
															<Grid item xs={6} className={classes.sliderLeftText}>
																<Typography
																	variant='caption'
																	style={{
																		fontSize: 11,
																	}}
																>
																	Bad
																</Typography>
															</Grid>
															<Grid item xs={6} className={classes.sliderRightText}>
																<Typography
																	variant='caption'
																	style={{
																		fontSize: 11,
																	}}
																>
																	Good
																</Typography>
															</Grid>
															<Grid item xs={12} className={classes.gridItemSlider}>
																<Slider
																	classes={{
																		track: classes.sliderTrack,
																		rail: classes.sliderTrack,
																		mark: classes.sliderMarks,
																		markActive: classes.sliderMarks,
																	}}
																	value={getScore(criteria.id, option.id)}
																	min={0}
																	max={100}
																	step={1}
																	marks={sliderMarks}
																	onChange={(event, value) => onChange(event, criteria.id, option.id, value as number)}
																	onChangeCommitted={(event, value) => onChangeCommitted(value as number, criteria.id, option.id)}
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
			<div className={classes.emptySpace} />
			<InfoDialog text={LongStrings.OptionsRatingInfo} show={showInfo} onClose={() => setShowInfo(false)} />
		</div>
	);
};

export default RateOptions;
