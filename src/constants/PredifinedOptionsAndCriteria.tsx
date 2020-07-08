import {OptionAndCriteria} from '../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice';

export const predefinedDecisionOptions: OptionAndCriteria[] = [
	{
		id: 1,
		name: 'Invest in gold',
		score: 0,
	},
	{
		id: 2,
		name: 'Invest in shares',
		score: 0,
	},
	{
		id: 3,
		name: 'Invest in real state',
		score: 0,
	},
];

export const predefinedSelectionCriteria: OptionAndCriteria[] = [
	{
		id: 1,
		name: 'Risks',
		score: 0,
	},
	{
		id: 2,
		name: 'Long term profit',
		score: 0,
	},
	{
		id: 3,
		name: 'Short term profit',
		score: 0,
	},
	{
		id: 4,
		name: 'Monthly cash flow',
		score: 0,
	},
];
