import {OptionAndCriteria} from './redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import {WeightedCriteriaType} from './redux/actionsAndSlicers/WeightCriteriaSlice';
import {RatedOption} from './redux/actionsAndSlicers/RatedOptionsSlice';

export const getScoredDecisionOptions = (
	decisionOptions: OptionAndCriteria[],
	selectionCriteria: OptionAndCriteria[],
	weightedCriteria: WeightedCriteriaType[],
	ratedOptions: RatedOption[]
): OptionAndCriteria[] => {
	const newDecisionOptions: OptionAndCriteria[] = [];

	const weightSum = weightedCriteria.reduce((a, b) => +a + +Math.abs(b.weight), 0);

	decisionOptions.forEach(option => {
		let score = 0;

		ratedOptions
			.filter(ratedOption => ratedOption.decisionOptionId === option.id)
			.forEach(ratedOption => {
				const selectionCriteriaLocal = selectionCriteria.find(criteria => criteria.id === ratedOption.selectionCriteriaId);
				if (selectionCriteriaLocal != null) score += ratedOption.score * selectionCriteriaLocal.score;
			});

		score = weightSum === 0 ? 0 : +Math.min(score / 100, 10).toFixed(1);

		newDecisionOptions.push({...option, score});
	});

	return newDecisionOptions;
};

export const getScoredSelectionCriteria = (
	decisionOptions: OptionAndCriteria[],
	selectionCriteria: OptionAndCriteria[],
	weightedCriteria: WeightedCriteriaType[]
): OptionAndCriteria[] => {
	const newSelectionCriteria: OptionAndCriteria[] = [];

	const weightSum = weightedCriteria.reduce((a, b) => +a + +Math.abs(b.weight), 0);

	selectionCriteria.forEach(criteria => {
		let score = 0;
		const summedCriteria = sumWeightedCriteriaOfSelectionCriteria(weightedCriteria, criteria.id);

		if (summedCriteria !== 0) score = +Math.min((summedCriteria / weightSum) * 10, 10).toFixed(1);

		newSelectionCriteria.push({...criteria, score});
	});
	return newSelectionCriteria;
};

const sumWeightedCriteriaOfSelectionCriteria = (
	weightedCriteria: WeightedCriteriaType[],
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
