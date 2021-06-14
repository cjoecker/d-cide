import {OptionAndCriteria} from './redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import {RatedOption} from './redux/actionsAndSlicers/RatedOptionsSlice';
import {WeightedCriteriaType} from './redux/actionsAndSlicers/WeightCriteriaSlice';

export const createWeightedCriteria = (
	_weightedCriteria: WeightedCriteriaType[],
	_selectionCriteria: OptionAndCriteria[]
) => {
	let newWeightedCriteria: WeightedCriteriaType[] = [];

	let id = Math.max(..._weightedCriteria.map(object => object.id), 0) + 1;

	for (let i = 0; i < _selectionCriteria.length; i += 1) {
		for (let j = i + 1; j < _selectionCriteria.length; j += 1) {
			const existingWeightedCriteria = _weightedCriteria.find(
				weightedCriteriaObj =>
					(weightedCriteriaObj.selectionCriteria1Id === _selectionCriteria[i].id &&
						weightedCriteriaObj.selectionCriteria2Id === _selectionCriteria[j].id) ||
					(weightedCriteriaObj.selectionCriteria1Id === _selectionCriteria[j].id &&
						weightedCriteriaObj.selectionCriteria2Id === _selectionCriteria[i].id)
			);

			newWeightedCriteria = [
				...newWeightedCriteria,
				{
					id,
					weight: existingWeightedCriteria != null ? existingWeightedCriteria.weight : 0,
					selectionCriteria1Id: _selectionCriteria[i].id,
					selectionCriteria2Id: _selectionCriteria[j].id,
				},
			];

			id += 1;
		}
	}
	return newWeightedCriteria;
};

export const createRatedOptions = (
	_ratedOptions: RatedOption[],
	_decisionOptions: OptionAndCriteria[],
	_selectionCriteria: OptionAndCriteria[]
) => {
	let newRatedOption: RatedOption[] = _ratedOptions;

	let id = Math.max(..._ratedOptions.map(object => object.id), 0) + 1;

	_decisionOptions.forEach(option => {
		_selectionCriteria.forEach(criteria => {
			const foundRatedOption = _ratedOptions.find(
				obj => obj.selectionCriteriaId === criteria.id && obj.decisionOptionId === option.id
			);

			if (foundRatedOption == null) {
				newRatedOption = [
					...newRatedOption,
					{
						id,
						score: 50,
						decisionOptionId: option.id,
						selectionCriteriaId: criteria.id,
					},
				];
				id += 1;
			}
		});
	});
	return newRatedOption;
};
