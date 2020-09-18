import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as LongStrings from '../../../constants/InfoDialogTexts';

import OptionsAndCriteriaSlice, {
	OptionsAndCriteriaKeys,
} from '../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import ResultsChart from './components/ResultsChart';
import {RootState} from '../../../services/redux/rootReducer';
import {useEffectUnsafe} from '../../../services/unsafeHooks';
import {getScoredDecisionOptions, getScoredSelectionCriteria} from '../../../services/scoresCalculator';

const useStyles = makeStyles(theme => ({
	divMain: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5.5),
		textAlign: 'center',
	},

	gridItem: {
		maxWidth: theme.spacing(75),
		minWidth: theme.spacing(38),
		margin: theme.spacing(2),
	},
}));

const Results: React.FC = () => {
	const [hiddenBeforeCalcScores, setHiddenBeforeCalcScores] = useState(true);

	const {selectionCriteria, decisionOptions} = useSelector((state: RootState) => state.OptionsAndCriteria, shallowEqual);
	const ratedOptions = useSelector((state: RootState) => state.RatedOptions, shallowEqual);
	const weightedCriteria = useSelector((state: RootState) => state.WeightedCriteria, shallowEqual);
	const dispatch = useDispatch();
	const classes = useStyles();

	useEffectUnsafe(() => {
		dispatch(
			OptionsAndCriteriaSlice.actions.setSelectionCriteria(
				getScoredSelectionCriteria(decisionOptions, selectionCriteria, weightedCriteria)
			)
		);
	}, []);

	useEffectUnsafe(() => {
		dispatch(
			OptionsAndCriteriaSlice.actions.setDecisionOptions(
				getScoredDecisionOptions(decisionOptions, selectionCriteria, weightedCriteria, ratedOptions)
			)
		);
		setHiddenBeforeCalcScores(false);
	}, [selectionCriteria]);

	return (
		<div className={classes.divMain}>
			<Grid container justify='center' alignContent='center'>
				<Grid className={classes.gridItem} key='1' item xs={12}>
					<ResultsChart
						itemsKey={OptionsAndCriteriaKeys.decisionOptions}
						hidden={hiddenBeforeCalcScores}
						title='Decision Options Ranking'
						infoText={LongStrings.OptionsResultInfo}
					/>
				</Grid>
				<Grid className={classes.gridItem} key='2' item xs={12}>
					<ResultsChart
						itemsKey={OptionsAndCriteriaKeys.selectionCriteria}
						hidden={hiddenBeforeCalcScores}
						title='Selection Criteria Ranking'
						infoText={LongStrings.CriteriaResultInfo}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Results;
