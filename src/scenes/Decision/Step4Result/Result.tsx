import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as LongStrings from '../../../constants/InfoDialogTexts';
import theme from '../../../muiTheme';
import OptionsAndCriteriaSlice, {
	OptionsAndCriteriaKeys,
} from '../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import ResultsChart from './components/ResultsChart';
import {getScoredDecisionOptions, getScoredSelectionCriteria} from '../../../services/scoresCalculator';
import {RootState} from '../../../services/redux/rootReducer';

const useStyles = makeStyles({
	divMain: {
		paddingTop: theme().spacing(2.5),
		paddingBottom: theme().spacing(5.5),
		textAlign: 'center',
	},

	gridItem: {
		maxWidth: theme().spacing(75),
		minWidth: theme().spacing(38),
		margin: theme().spacing(2),
	},
});

type Props = {
	hidden: boolean;
};
const Results: React.FC<Props> = (props: Props) => {
	const [hiddenAfterCalcScores, setHiddenAfterCalcScores] = useState(true);

	const {selectionCriteria, decisionOptions} = useSelector((state: RootState) => state.OptionsAndCriteria, shallowEqual);
	const ratedOptions = useSelector((state: RootState) => state.RatedOptions, shallowEqual);
	const weightedCriteria = useSelector((state: RootState) => state.WeightedCriteria, shallowEqual);

	const {hidden} = props;
	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(() => {
		if (!hidden)
			dispatch(
				OptionsAndCriteriaSlice.actions.setSelectionCriteria(
					getScoredSelectionCriteria(decisionOptions, selectionCriteria, weightedCriteria)
				)
			);
		else setHiddenAfterCalcScores(true);
	}, [hidden]);

	useEffect(() => {
		if (!hidden) {
			dispatch(
				OptionsAndCriteriaSlice.actions.setDecisionOptions(
					getScoredDecisionOptions(decisionOptions, selectionCriteria, weightedCriteria, ratedOptions)
				)
			);
			setHiddenAfterCalcScores(false);
		}
	}, [selectionCriteria]);

	return (
		<div className={classes.divMain}>
			<Grid container justify='center' alignContent='center'>
				<Grid className={classes.gridItem} key='1' item xs={12}>
					<ResultsChart
						itemsKey={OptionsAndCriteriaKeys.decisionOptions}
						hidden={hiddenAfterCalcScores}
						title='Decision Options Ranking'
						infoText={LongStrings.OptionsResultInfo}
					/>
				</Grid>
				<Grid className={classes.gridItem} key='2' item xs={12}>
					<ResultsChart
						itemsKey={OptionsAndCriteriaKeys.selectionCriteria}
						hidden={hiddenAfterCalcScores}
						title='Selection Criteria Ranking'
						infoText={LongStrings.CriteriaResultInfo}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Results;
