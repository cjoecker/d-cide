import React, { Component, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import update from "immutability-helper";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";
import Fade from "@material-ui/core/Fade";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import theme from "../../../muiTheme";
import * as LongStrings from "../../../services/LongTexts";
import InfoDialog from "../../../components/InfoDialog";
import {
	getWeightedCriteria,
	updateWeightedCriteria,
} from "../../../services/redux/WeightCriteriaActions";
import { WeightedCriteria } from "../../../services/redux/WeightCriteriaSlice";
import { RootState } from "../../../services/redux/rootReducer";
import { OptionAndCriteria } from "../../../services/redux/OptionsAndCriteriaSlice";

const useStyles = makeStyles({
	divMain: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5.5),
		textAlign: "center",
		alignContent: "center",
	},

	infoButton: {
		bottom: theme.spacing(0.25),
		left: theme.spacing(1.2),
	},

	paper: {
		padding: theme.spacing(1),
		marginBottom: theme.spacing(2),
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
		width: "100%",
	},

	gridItemCriteria: {
		minWidth: theme.spacing(40),
		maxWidth: theme.spacing(50),
		display: "flex",
		alignItems: "center",
	},

	sliderMark: {
		height: 8,
		width: 1,
		marginTop: -3,
		backgroundColor: theme.palette.primary.main,
	},

	sliderTrack: {
		opacity: 100,
	},

	gridItemSlider: {
		marginTop: -theme.spacing(2),
		marginBottom: -theme.spacing(1),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},

	gridItemSliderInfo: {
		marginTop: -theme.spacing(2.5),
	},

	emptySpace: {
		height: theme.spacing(4),
	},
});

type Props = {
	hidden: boolean;
};

const WeightCriteria: React.FC<Props> = (props: Props) => {
	const { decisionId } = useParams();
	const { hidden } = props;

	const [showInfo, setShowInfo] = useState(false);
	const [weightedCriteria, setWeightedCriteria] = useState<
		WeightedCriteriaLocalType[]
	>([]);
	const [weightInfo, setWeightInfo] = useState<string[]>([]);
	const selectionCriteria = useSelector(
		(state: RootState) => state.OptionsAndCriteria.selectionCriteria,
		shallowEqual
	);
	const importedWeightedCriteria = useSelector(
		(state: RootState) => state.WeightedCriteria,
		shallowEqual
	);

	const classes = useStyles();
	const dispatch = useDispatch();
	const onChangeSlider$ = new Subject();

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

	type WeightedCriteriaLocalType = {
		id: number;
		weight: number;
		selectionCriteria1: OptionAndCriteria;
		selectionCriteria2: OptionAndCriteria;
	};

	useEffect(() => {
		const subscription = onChangeSlider$
			.pipe(debounceTime(1500))
			.subscribe((criteria) => {
				updateWeightedCriteria(dispatch, decisionId, criteria);
			});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (!hidden) getWeightedCriteria(dispatch, decisionId);
		else setWeightedCriteria([]);
	}, [hidden]);

	useEffect(() => {
		if (importedWeightedCriteria.length > 0) {
			prepareWeightedCriteria();
		}
	}, [importedWeightedCriteria]);

	const onChange = (event, value, itemLocal, index) => {
		onChangeSlider$.next(itemLocal);

		setWeightedCriteria(
			weightedCriteria.map((criteria) =>
				criteria.id === itemLocal.id ? { ...criteria, weight: value } : criteria
			)
		);

		updateWeightInfo(index, itemLocal);
	};

	const prepareWeightedCriteria = () => {
		const newWeightInfo = weightInfo;
		let weightedCriteriaArray = [];

		importedWeightedCriteria.forEach((criteria, index) => {
			const criteria1 = selectionCriteria.find(
				(obj) => obj.id === criteria.selectionCriteria1Id
			);

			const criteria2 = selectionCriteria.find(
				(obj) => obj.id === criteria.selectionCriteria2Id
			);

			const newWeightedCriteria = {
				id: criteria.id,
				weight: criteria.weight,
				selectionCriteria1: criteria1,
				selectionCriteria2: criteria2,
			};

			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			newWeightInfo[index] = getWeightInfoText(newWeightedCriteria);

			weightedCriteriaArray = [...weightedCriteriaArray, newWeightedCriteria];
		});

		setWeightInfo(newWeightInfo);
		setWeightedCriteria(weightedCriteriaArray);
	};

	const updateWeightInfo = (index, criteria) => {
		const newWeightInfo = weightInfo;

		console.log(getWeightInfoText(criteria))

		newWeightInfo[index] = getWeightInfoText(criteria);

		setWeightInfo(newWeightInfo);
	};

	const getWeightInfoText = (itemLocal): string => {
		switch (true) {
			case itemLocal.weight < -66:
				return `${itemLocal.selectionCriteria1.name} is way more important than ${itemLocal.selectionCriteria2.name}`;
			case itemLocal.weight < -33:
				return `${itemLocal.selectionCriteria1.name} is more important than ${itemLocal.selectionCriteria2.name}`;
			case itemLocal.weight < -5:
				return `${itemLocal.selectionCriteria1.name} is a little more important than ${itemLocal.selectionCriteria2.name}`;
			case itemLocal.weight < 5:
				return `${itemLocal.selectionCriteria1.name} is as important as ${itemLocal.selectionCriteria2.name}`;
			case itemLocal.weight < 33:
				return `${itemLocal.selectionCriteria2.name} is a little more important than ${itemLocal.selectionCriteria1.name}`;
			case itemLocal.weight < 66:
				return `${itemLocal.selectionCriteria2.name} is more important than ${itemLocal.selectionCriteria1.name}`;
			case itemLocal.weight <= 100:
				return `${itemLocal.selectionCriteria2.name} is way more important than ${itemLocal.selectionCriteria1.name}`;
			default:
				return "";
		}
	};

	return (
		<div className={classes.divMain}>
			<Grid container justify="center" alignContent="center">
				<Grid item xs={12}>
					<Typography variant="h5" gutterBottom>
						Weight Criteria
						<IconButton
							aria-label="Help"
							className={classes.infoButton}
							onClick={() => setShowInfo(true)}
						>
							<InfoIcon color="secondary" />
						</IconButton>
					</Typography>
				</Grid>
				{weightedCriteria.map((criteria, index) => (
					<Fade in style={{ transitionDelay: `${index * 100}ms` }}>
						<Grid
							item
							xs={6}
							className={classes.gridItemCriteria}
							key={criteria.id}
						>
							<Paper elevation={2} className={classes.paper}>
								<Grid container spacing={2} alignItems="center">
									<Grid item xs={6} >
										<Typography variant="body1">
											{criteria.selectionCriteria1.name}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body1">
											{criteria.selectionCriteria2.name}
										</Typography>
									</Grid>
									<Grid
										item
										xs={12}
										zeroMinWidth
										className={classes.gridItemSlider}
									>
										<Slider
											classes={{
												track: classes.sliderTrack,
												rail: classes.sliderTrack,
												mark: classes.sliderMark,
												markActive: classes.sliderMark,
											}}
											value={criteria.weight}
											min={-100}
											max={100}
											step={1}
											marks={sliderMarks}
											onChange={(event, value) =>
												onChange(event, value, criteria, index)
											}
										/>
									</Grid>
									<Grid item xs={12} className={classes.gridItemSliderInfo}>
										<Typography variant="caption">
											{weightInfo[index]}
										</Typography>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Fade>
				))}
			</Grid>
			{/*Empty Line for Buttons*/}
			<div className={classes.emptySpace} />
			{/*Info Dialogs*/}
			<InfoDialog
				title="Weight Criteria"
				text={LongStrings.WeightCriteriaInfo}
				show={showInfo}
				hide={() => setShowInfo(false)}
			/>
		</div>
	);
};

export default WeightCriteria;
