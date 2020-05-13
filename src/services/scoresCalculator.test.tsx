// Link.react.test.js
import React from 'react';
import {getScoredDecisionOptions, getScoredSelectionCriteria} from './scoresCalculator';
import {WeightedCriteria} from './redux/actionsAndSlicers/WeightCriteriaSlice';
import {RatedOption} from './redux/actionsAndSlicers/RatedOptionsSlice';
import {predefinedDecisionOptions, predefinedSelectionCriteria} from '../constants/PredifinedOptionsAndCriteria';

it('calculates options and criteria scores', () => {
	const weightedCriteria: WeightedCriteria[] = [
		{id: 1, weight: -100, selectionCriteria1Id: 1, selectionCriteria2Id: 2},
		{id: 2, weight: -100, selectionCriteria1Id: 1, selectionCriteria2Id: 3},
		{id: 3, weight: -100, selectionCriteria1Id: 1, selectionCriteria2Id: 4},
		{id: 4, weight: 50, selectionCriteria1Id: 2, selectionCriteria2Id: 3},
		{id: 5, weight: 50, selectionCriteria1Id: 2, selectionCriteria2Id: 4},
		{id: 6, weight: -50, selectionCriteria1Id: 3, selectionCriteria2Id: 4},
	];

	const ratedOptions: RatedOption[] = [
		{id: 1, score: 100, decisionOptionId: 1, selectionCriteriaId: 1},
		{id: 2, score: 0, decisionOptionId: 1, selectionCriteriaId: 2},
		{id: 3, score: 25, decisionOptionId: 1, selectionCriteriaId: 3},
		{id: 4, score: 50, decisionOptionId: 1, selectionCriteriaId: 4},
		{id: 5, score: 50, decisionOptionId: 2, selectionCriteriaId: 1},
		{id: 6, score: 50, decisionOptionId: 2, selectionCriteriaId: 2},
		{id: 7, score: 50, decisionOptionId: 2, selectionCriteriaId: 3},
		{id: 8, score: 50, decisionOptionId: 2, selectionCriteriaId: 4},
		{id: 9, score: 0, decisionOptionId: 3, selectionCriteriaId: 1},
		{id: 10, score: 100, decisionOptionId: 3, selectionCriteriaId: 2},
		{id: 11, score: 75, decisionOptionId: 3, selectionCriteriaId: 3},
		{id: 12, score: 50, decisionOptionId: 3, selectionCriteriaId: 4},
	];

	const scoredSelectionCriteria = getScoredSelectionCriteria(
		predefinedDecisionOptions,
		predefinedSelectionCriteria,
		weightedCriteria
	);

	const scoredDecisionOptions = getScoredDecisionOptions(
		predefinedDecisionOptions,
		scoredSelectionCriteria,
		weightedCriteria,
		ratedOptions
	);

	expect(scoredSelectionCriteria).toEqual([
		{id: 1, name: 'Size', score: 6.7},
		{id: 2, name: 'Garden', score: 0},
		{id: 3, name: 'Kitchen', score: 2.2},
		{id: 4, name: 'Neighborhood', score: 1.1},
	]);

	expect(scoredDecisionOptions).toEqual([
		{id: 1, name: 'House 1', score: 7.8},
		{id: 2, name: 'House 2', score: 5},
		{id: 3, name: 'House 3', score: 2.2},
	]);
});
