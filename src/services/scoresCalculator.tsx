import OptionsAndCriteriaSlice, {OptionAndCriteria} from './redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import {WeightedCriteria} from './redux/actionsAndSlicers/WeightCriteriaSlice';
import {AppDispatch} from './redux/store';
import {RatedOption} from './redux/actionsAndSlicers/RatedOptionsSlice';

export const calculateOptionsScores = (
	dispatch: AppDispatch,
	decisionOptions: OptionAndCriteria[],
	selectionCriteria: OptionAndCriteria[],
	weightedCriteria: WeightedCriteria[],
	ratedOptions: RatedOption[]
) => {
	calculateCriteriaScores(dispatch, decisionOptions, selectionCriteria, weightedCriteria);
};

export const calculateCriteriaScores = (
	dispatch: AppDispatch,
	decisionOptions: OptionAndCriteria[],
	selectionCriteria: OptionAndCriteria[],
	weightedCriteria: WeightedCriteria[]
) => {
	const weightSum = weightedCriteria.reduce((a, b) => +a + +Math.abs(b.weight), 0);

	selectionCriteria.forEach(criteria => {
		let weight = 0;
		const summedCriteria = sumWeightedCriteriaOfSelectionCriteria(weightedCriteria, criteria.id);

		if (summedCriteria !== 0) weight = +Math.min((summedCriteria / weightSum) * 10, 10).toFixed(1);

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
