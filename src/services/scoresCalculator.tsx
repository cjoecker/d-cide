import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import OptionsAndCriteriaSlice from './redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import {RootState} from './redux/rootReducer';
import {WeightedCriteria} from './redux/actionsAndSlicers/WeightCriteriaSlice';

export const calculateOptionsScores = () => {
	calculateCriteriaScores();
};

export const calculateCriteriaScores = () => {
	const dispatch = useDispatch();

	const selectionCriteria = useSelector((state: RootState) => state.OptionsAndCriteria.selectionCriteria, shallowEqual);
	const weightedCriteria = useSelector((state: RootState) => state.WeightedCriteria, shallowEqual);

	const weightSum = weightedCriteria.reduce((a, b) => +a + +b.weight, 0);

	selectionCriteria.forEach(criteria => {
		const weight = Math.min((sumWeightedCriteriaOfSelectionCriteria(weightedCriteria, criteria.id) / weightSum) * 10, 10);
		dispatch(OptionsAndCriteriaSlice.actions.updateSelectionCriteria({...criteria, score: weight}));
	});
};

const sumWeightedCriteriaOfSelectionCriteria = (
	weightedCriteria: WeightedCriteria[],
	selectionCriteriaId: number
): number => {
	let weightedCriteriaSummed = 0;

	weightedCriteria.forEach(criteria => {
		if (
			(criteria.selectionCriteria1Id === selectionCriteriaId && criteria.weight <= 0) ||
			(criteria.selectionCriteria2Id === selectionCriteriaId && criteria.weight > 0)
		)
			weightedCriteriaSummed += Math.abs(criteria.weight);
	});

	return weightedCriteriaSummed;
};
