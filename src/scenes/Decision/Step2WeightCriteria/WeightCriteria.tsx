import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import theme from "../../../muiTheme";
import * as LongStrings from "../../../services/LongTexts";
import InfoDialog from "../../../components/InfoDialog";
import {
	getWeightedCriteria,
	updateWeightedCriteria
} from "../../../services/redux/actionsAndSlicers/WeightCriteriaActions";
import { RootState } from "../../../services/redux/rootReducer";
import { WeightedCriteria } from "../../../services/redux/actionsAndSlicers/WeightCriteriaSlice";
import { getOptionsAndCriteria } from "../../../services/redux/actionsAndSlicers/OptionsAndCriteriaActions";
import { OptionsAndCriteriaKeys } from "../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice";
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
		left: theme.spacing(1.2),
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

	sliderMarks: {
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
	const {decisionId} = useParams<ParamTypes>();
	const {hidden} = props;

	const [showInfo, setShowInfo] = useState(false);
	const [LocalWeightedCriteria, setLocalWeightedCriteria] = useState<WeightedCriteria[]>([]);
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
		if (!hidden) {
			getOptionsAndCriteria(dispatch, decisionId, OptionsAndCriteriaKeys.selectionCriteria, false);

			getWeightedCriteria(dispatch, decisionId);
		} else setLocalWeightedCriteria([]);
	}, [hidden]);

	useEffect(() => {
		if (weightedCriteria.length !== LocalWeightedCriteria.length) setLocalWeightedCriteria(weightedCriteria);
	}, [weightedCriteria]);

	const onChange = (event: React.BaseSyntheticEvent, value: number, itemLocal: WeightedCriteria) => {
		setLocalWeightedCriteria(
			LocalWeightedCriteria.map(criteria => {
				if (criteria.id === itemLocal.id) {
					return {...criteria, weight: value};
				}
				return criteria;
			})
		);
	};

	const onChangeCommitted = (value: number, itemLocal: WeightedCriteria) => {
		updateWeightedCriteria(dispatch, decisionId, {
			...itemLocal,
			weight: value,
		});
	};

	const getSelectionCriteriaName = (selectionCriteriaId: number) => {
		const FoundSelectionCriteria = selectionCriteria.find(obj => obj.id === selectionCriteriaId);

		return FoundSelectionCriteria == null ? 'Loading...' : FoundSelectionCriteria.name;
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
					<Typography variant='h5' gutterBottom>
						Weight Criteria
						<IconButton aria-label='Help' className={classes.infoButton} onClick={() => setShowInfo(true)}>
							<InfoIcon color='secondary' />
						</IconButton>
					</Typography>
				</Grid>
				{LocalWeightedCriteria.map((criteria, index) => (
					<Fade in timeout={500} style={{transitionDelay: `${index * 100}ms`}}>
						<Grid item xs={6} className={classes.gridItemCriteria} key={criteria.id}>
							<Paper elevation={2} className={classes.paper}>
								<Grid container spacing={2} alignItems='center'>
									<Grid item xs={6}>
										<Typography variant='body1'>{getSelectionCriteriaName(criteria.selectionCriteria1Id)}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant='body1'>{getSelectionCriteriaName(criteria.selectionCriteria2Id)}</Typography>
									</Grid>
									<Grid item xs={12} zeroMinWidth className={classes.gridItemSlider}>
										<Slider
											classes={{
												track: classes.sliderTrack,
												rail: classes.sliderTrack,
												mark: classes.sliderMarks,
												markActive: classes.sliderMarks,
											}}
											value={criteria.weight}
											min={-100}
											max={100}
											step={1}
											marks={sliderMarks}
											onChange={(event, value) => onChange(event, value as number, criteria)}
											onChangeCommitted={(event, value) => onChangeCommitted(value as number, criteria)}
										/>
									</Grid>
									<Grid item xs={12} className={classes.gridItemSliderInfo}>
										<Typography variant='caption'>
											{getWeightInfoText(criteria.weight, criteria.selectionCriteria1Id, criteria.selectionCriteria2Id)}
										</Typography>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Fade>
				))}
			</Grid>
			<div className={classes.emptySpace} />
			<InfoDialog text={LongStrings.WeightCriteriaInfo} show={showInfo} onClose={() => setShowInfo(false)} />
		</div>
	);
};

export default WeightCriteria;
