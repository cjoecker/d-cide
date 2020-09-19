import {createRatedOptions, createWeightedCriteria} from './createData';

it('creates weighted criteria', () => {
	const selectionCriteria = [
		{
			id: 1,
			name: '1',
			score: 0,
		},
		{
			id: 2,
			name: '2',
			score: 0,
		},
		{
			id: 3,
			name: '3',
			score: 0,
		},
		{
			id: 4,
			name: '4',
			score: 0,
		},
	];

	const existingWeightedCriteria = [
		{
			id: 1,
			weight: 10,
			selectionCriteria1Id: 1,
			selectionCriteria2Id: 2,
		},
		{
			id: 2,
			weight: -10,
			selectionCriteria1Id: 1,
			selectionCriteria2Id: 3,
		},
	];

	const expectedWeightedCriteria = [
		{
			id: 3,
			weight: 10,
			selectionCriteria1Id: 1,
			selectionCriteria2Id: 2,
		},
		{
			id: 4,
			weight: -10,
			selectionCriteria1Id: 1,
			selectionCriteria2Id: 3,
		},
		{
			id: 5,
			weight: 0,
			selectionCriteria1Id: 1,
			selectionCriteria2Id: 4,
		},
		{
			id: 6,
			weight: 0,
			selectionCriteria1Id: 2,
			selectionCriteria2Id: 3,
		},
		{
			id: 7,
			weight: 0,
			selectionCriteria1Id: 2,
			selectionCriteria2Id: 4,
		},
		{
			id: 8,
			weight: 0,
			selectionCriteria1Id: 3,
			selectionCriteria2Id: 4,
		},
	];

	expect(createWeightedCriteria(existingWeightedCriteria, selectionCriteria)).toEqual(expectedWeightedCriteria);
});

it('create rated options', () => {
	const selectionCriteria = [
		{
			id: 1,
			name: 'c1',
			score: 0,
		},
		{
			id: 2,
			name: 'c2',
			score: 0,
		},
		{
			id: 3,
			name: 'c3',
			score: 0,
		},
		{
			id: 4,
			name: 'c4',
			score: 0,
		},
	];

	const decisionOptions = [
		{
			id: 1,
			name: 'o1',
			score: 0,
		},
		{
			id: 2,
			name: 'o2',
			score: 0,
		},
	];

	const existingRatedOptions = [
		{
			id: 1,
			score: 20,
			decisionOptionId: 1,
			selectionCriteriaId: 1,
		},
		{
			id: 2,
			score: 100,
			decisionOptionId: 2,
			selectionCriteriaId: 2,
		},
	];
	const expectedRatedOptions = [
		{id: 1, score: 20, decisionOptionId: 1, selectionCriteriaId: 1},
		{id: 2, score: 100, decisionOptionId: 2, selectionCriteriaId: 2},
		{id: 3, score: 50, decisionOptionId: 1, selectionCriteriaId: 2},
		{id: 4, score: 50, decisionOptionId: 1, selectionCriteriaId: 3},
		{id: 5, score: 50, decisionOptionId: 1, selectionCriteriaId: 4},
		{id: 6, score: 50, decisionOptionId: 2, selectionCriteriaId: 1},
		{id: 7, score: 50, decisionOptionId: 2, selectionCriteriaId: 3},
		{id: 8, score: 50, decisionOptionId: 2, selectionCriteriaId: 4},
	];

	expect(createRatedOptions(existingRatedOptions, decisionOptions, selectionCriteria)).toEqual(expectedRatedOptions);
});
