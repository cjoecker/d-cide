import React, {useEffect, useState} from "react";
// import PropTypes from "prop-types";
// import {makeStyles, withStyles} from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import Slider from "@material-ui/core/Slider";
// import Typography from "@material-ui/core/Typography";
// import RateSlider_Scale from "../../../images/RateSlider_Scale.svg";
// import IconButton from "@material-ui/core/IconButton";
// import InfoIcon from "@material-ui/icons/Info";
// import InfoDialog from "../../../components/InfoDialog";
// import * as LongStrings from "../../../services/LongTexts";
// import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
// import {
// 	getRatedOptions,
// 	putRatedOption,
// } from "../../../services/redux/RatedOptionsActions";
// import ReactGA from "react-ga";
// import Fade from "@material-ui/core/Fade";
// import { Subject } from "rxjs";
// import { debounceTime } from "rxjs/operators";
// import WeightCriteria from "../2_WeightCriteria/WeightCriteria";
// import {useParams} from "react-router-dom";
// import {RootState} from "../../../services/redux/rootReducer";
// import theme from "../../../muiTheme";
// import {RatedOption} from "../../../services/redux/RatedOptionsSlice";
// import {OptionAndCriteria} from "../../../services/redux/OptionsAndCriteriaSlice";
// import {getWeightedCriteria, updateWeightedCriteria} from "../../../services/redux/WeightCriteriaActions";
//
// let onChange$ = new Subject();
//
// const useStyles = makeStyles({
// 	divMain: {
// 		paddingTop: theme.spacing(2.5),
// 		paddingBottom: theme.spacing(5.5),
// 		textAlign: "center",
// 		alignContent: "center",
// 	},
//
// 	infoButton: {
// 		bottom: theme.spacing(0.25),
// 		left: theme.spacing(1),
// 	},
//
// 	paper: {
// 		padding: theme.spacing(1),
// 		marginBottom: theme.spacing(2),
// 		marginRight: theme.spacing(1),
// 		marginLeft: theme.spacing(1),
// 	},
//
// 	TitleGridItem: {
// 		minWidth: theme.spacing(40),
// 		maxWidth: theme.spacing(50),
// 	},
//
// 	gridItem_gridContainer: {
// 		paddingBottom: theme.spacing(1),
// 	},
//
// 	gridItem_gridContainer_title: {
// 		paddingLeft: theme.spacing(2),
// 	},
//
// 	slider_textLeft: {
// 		paddingLeft: theme.spacing(1.8),
// 		paddingRight: theme.spacing(1.8),
// 		marginTop: theme.spacing(1),
// 		textAlign: "left",
// 	},
//
// 	slider_textRight: {
// 		paddingLeft: theme.spacing(1.8),
// 		paddingRight: theme.spacing(1.8),
// 		marginTop: theme.spacing(1),
// 		textAlign: "right",
// 	},
//
// 	gridItem_slider: {
// 		marginTop: -theme.spacing(2),
// 		marginLeft: theme.spacing(1),
// 		marginRight: theme.spacing(1),
// 	},
//
// 	slider_mark: {
// 		height: 8,
// 		width: 1,
// 		marginTop: -3,
// 		backgroundColor: theme.palette.primary.main,
// 	},
//
// 	slider_track: {
// 		opacity: 100,
// 	},
//
// 	emptySpace: {
// 		height: theme.spacing(4),
// 	},
// });
//
//
//
//
// type Props = {
// 	hidden: boolean;
// };
//
// const RateOptions: React.FC<Props> = (props: Props) => {
//
// 	const { decisionId } = useParams();
// 	const { hidden } = props;
//
// 	const [showInfo, setShowInfo] = useState(false);
//
// 	const [ratedOptions, setRatedOptions] = useState<
// 		RatedOption[]
// 		>([]);
//
// 	const selectionCriteria = useSelector(
// 		(state: RootState) => state.OptionsAndCriteria.selectionCriteria,
// 		shallowEqual
// 	);
//
// 	const decisionOptions = useSelector(
// 		(state: RootState) => state.OptionsAndCriteria.decisionOptions,
// 		shallowEqual
// 	);
//
// 	const importedRatedOptions = useSelector(
// 		(state: RootState) => state.RatedOptions,
// 		shallowEqual
// 	);
//
//
// 	const classes = useStyles();
// 	const dispatch = useDispatch();
//
//
//
// 	const marks = [
// 		{
// 			value: 2,
// 		},
// 		{
// 			value: 26,
// 		},
// 		{
// 			value: 50,
// 		},
// 		{
// 			value: 74,
// 		},
// 		{
// 			value: 98,
// 		},
// 	];
//
//
//
// 	useEffect(() => {
// 		const subscription = onChangeSlider$
// 			.pipe(debounceTime(1000))
// 			.subscribe((criteria) => {
// 				updateWeightedCriteria(dispatch, decisionId, criteria);
// 			});
//
// 		return () => {
// 			subscription.unsubscribe();
// 		};
// 	}, []);
//
// 	useEffect(() => {
// 		if (!hidden) getWeightedCriteria(dispatch, decisionId);
// 		else setWeightedCriteria([]);
// 	}, [hidden]);
//
// 	useEffect(() => {
// 		if (importedWeightedCriteria.length !== weightedCriteria.length) {
// 			prepareWeightedCriteria();
// 		}
// 	}, [importedWeightedCriteria]);
//
//
// 	//Load Data from Server
// 	componentDidMount() {
// 		this.props.getRatedOptions(this.props.decisionId);
//
// 		const subscription = onChange$
// 			.pipe(debounceTime(500))
// 			.subscribe((data) => this.fetchSliderValues(data));
//
// 		// prevent memory leaks
// 		this.setState((prevState) => ({ ...prevState, subscription }));
// 	}
//
// 	componentWillUnmount() {
// 		// prevent memory leaks
// 		this.state.subscription.unsubscribe();
// 	}
//
// 	//Refresh when redux state changes
// 	componentDidUpdate(prevProps, prevState, snapshot) {
// 		if (
// 			prevProps.rateOptions.ratedCriteria !==
// 			this.props.rateOptions.ratedCriteria
// 		) {
// 			this.setRatedOptions();
// 		}
// 	}
//
// 	onChange = (event, criteriaIndex, optionIndex, score) => {
// 		//send data to fetch
// 		const ratedOption = {
// 			score: score,
// 			decisionOptionId: this.state.ratedCriteria[criteriaIndex].decisionOption[
// 				optionIndex
// 			].id,
// 			selectionCriteriaId: this.state.ratedCriteria[criteriaIndex].id,
// 		};
//
// 		onChange$.next(ratedOption);
//
// 		//Update State
// 		let ratedCriteriaLocal = this.state.ratedCriteria;
//
// 		ratedCriteriaLocal[criteriaIndex].decisionOption[optionIndex].score = score;
//
// 		this.setState({
// 			ratedCriteria: ratedCriteriaLocal,
// 		});
// 	};
//
// 	fetchSliderValues(ratedOption) {
// 		this.props.putRatedOption(this.props.decisionId, ratedOption);
// 	}
//
// 	onHideInfo() {
// 		this.setState({ showInfo: false });
//
// 		ReactGA.event({
// 			category: "Rate Options",
// 			action: "Hide Info",
// 		});
// 	}
//
// 	onShowInfo = () => {
// 		this.setState({ showInfo: true });
// 		ReactGA.event({
// 			category: "Rate Options",
// 			action: "Show Info",
// 		});
// 	};
//
// 	setRatedOptions() {
// 		//get basic data
// 		let { selectionCriteria } = this.props.optionsAndCriteria;
// 		let { decisionOptions } = this.props.optionsAndCriteria;
// 		let importedRatedCriteria = [];
// 		let ratedCriteria = [];
//
// 		importedRatedCriteria = this.props.rateOptions.ratedCriteria;
//
// 		//Create nested object to summarize list
// 		selectionCriteria.forEach(function (criteria) {
// 			let decisionOptionLocal = [];
//
// 			//Add object properties
// 			decisionOptions.forEach(function (option) {
// 				let optionLocal = Object.assign({}, option);
//
// 				//Get old scores
// 				let objIndex = importedRatedCriteria.findIndex(
// 					(obj) =>
// 						obj.selectionCriteriaId === criteria.id &&
// 						obj.decisionOptionId === option.id
// 				);
//
// 				//Add scores if existing
// 				optionLocal.score =
// 					objIndex >= 0 ? importedRatedCriteria[objIndex].score : 50;
//
// 				decisionOptionLocal = [...decisionOptionLocal, optionLocal];
// 			});
//
// 			//add objects to array
// 			criteria.decisionOption = decisionOptionLocal;
// 			ratedCriteria = [...ratedCriteria, criteria];
// 		});
//
// 		this.setState({ ratedCriteria: ratedCriteria });
// 	}
//
//
// 		return (
// 			<div className={classes.divMain}>
// 				<Grid container justify="center" alignContent="center" spacing={24}>
// 					<Grid item xs={12}>
// 						<Typography variant="h5" gutterBottom>
// 							Rate Options
// 							<IconButton
// 								aria-label="Help"
// 								className={classes.infoButton}
// 								onClick={() => setShowInfo(true)}
// 							>
// 								<InfoIcon color="secondary" />
// 							</IconButton>
// 						</Typography>
// 					</Grid>
// 					{this.state.ratedCriteria.map((criteria, criteriaIndex) => (
// 						<Fade
// 							in={true}
// 							style={{
// 								transitionDelay: `${criteriaIndex * 100}ms`,
// 							}}
// 						>
// 							<Grid
// 								item
// 								xs={6}
// 								className={classes.gridItem_title}
// 								key={criteria.id}
// 							>
// 								<Paper
// 									className={classes.paper}
// 									elevation={2}
// 									key={criteria.id}
// 								>
// 									<div>
// 										<Grid container spacing={16}>
// 											<Grid item xs={12}>
// 												<Typography variant="h6">{criteria.name}</Typography>
// 											</Grid>
// 											{criteria.decisionOption.map((option, optionIndex) => (
// 												<Grid
// 													container
// 													justify="center"
// 													alignItems="center"
// 													className={classes.gridItem_gridContainer}
// 													key={option.id}
// 												>
// 													<Grid
// 														item
// 														xs={4}
// 														className={classes.gridItem_gridContainer_title}
// 													>
// 														{option.name}
// 													</Grid>
// 													<Grid item xs={8}>
// 														<Grid container>
// 															<Grid
// 																item
// 																xs={6}
// 																className={classes.slider_textLeft}
// 															>
// 																<Typography
// 																	variant="caption"
// 																	style={{
// 																		fontSize: 11,
// 																	}}
// 																>
// 																	Bad
// 																</Typography>
// 															</Grid>
// 															<Grid
// 																item
// 																xs={6}
// 																className={classes.slider_textRight}
// 															>
// 																<Typography
// 																	variant="caption"
// 																	style={{
// 																		fontSize: 11,
// 																	}}
// 																>
// 																	Good
// 																</Typography>
// 															</Grid>
// 															<Grid
// 																item
// 																xs={12}
// 																className={classes.gridItem_slider}
// 															>
// 																<Slider
// 																	classes={{
// 																		track: classes.slider_track,
// 																		rail: classes.slider_track,
// 																		mark: classes.slider_mark,
// 																		markActive: classes.slider_mark,
// 																	}}
// 																	value={option.score}
// 																	min={0}
// 																	max={100}
// 																	step={1}
// 																	marks={marks}
// 																	onChange={(event, value) =>
// 																		this.onChange(
// 																			event,
// 																			criteriaIndex,
// 																			optionIndex,
// 																			value
// 																		)
// 																	}
// 																/>
// 															</Grid>
// 														</Grid>
// 													</Grid>
// 												</Grid>
// 											))}
// 										</Grid>
// 									</div>
// 								</Paper>
// 							</Grid>
// 						</Fade>
// 					))}
// 				</Grid>
// 				{/*Empty Line for Buttons*/}
// 				<div className={classes.emptySpace} />
// 				{/*Info Dialogs*/}
// 				<InfoDialog
// 					title={"Rate Options"}
// 					text={LongStrings.OptionsRatingInfo}
// 					show={showInfo}
// 					hide={() => setShowInfo(false)}
// 				/>
// 			</div>
// 		);
//
// }
//
// export default RateOptions;