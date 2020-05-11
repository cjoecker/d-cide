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
	const weightSum = weightedCriteria.reduce((a, b) => +a + +Math.abs(b.weight), 0);

	const newSelectionCriteria = calculateCriteriaScores(
		dispatch,
		decisionOptions,
		selectionCriteria,
		weightedCriteria,
		weightSum
	);

	decisionOptions.forEach(option => {
		let score = 0;

		ratedOptions
			.filter(ratedOption => ratedOption.decisionOptionId === option.id)
			.forEach(ratedOption => {
				const selectionCriteriaLocal = newSelectionCriteria.find(
					criteria => criteria.id === ratedOption.selectionCriteriaId
				);
				if (selectionCriteriaLocal != null) score += ratedOption.score * selectionCriteriaLocal.score;
			});

		score = weightSum === 0 ? 0 : +Math.min(score / 100, 10).toFixed(1);

		dispatch(OptionsAndCriteriaSlice.actions.updateDecisionOption({...option, score}));
	});
};

export const calculateCriteriaScores = (
	dispatch: AppDispatch,
	decisionOptions: OptionAndCriteria[],
	selectionCriteria: OptionAndCriteria[],
	weightedCriteria: WeightedCriteria[],
	weightSum: number
): OptionAndCriteria[] => {
	const newSelectionCriteria: OptionAndCriteria[] = [];

	selectionCriteria.forEach(criteria => {
		let score = 0;
		const summedCriteria = sumWeightedCriteriaOfSelectionCriteria(weightedCriteria, criteria.id);

		if (summedCriteria !== 0) score = +Math.min((summedCriteria / weightSum) * 10, 10).toFixed(1);

		dispatch(OptionsAndCriteriaSlice.actions.updateSelectionCriteria({...criteria, score}));

		newSelectionCriteria.push({...criteria, score});
	});
	return newSelectionCriteria;
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
