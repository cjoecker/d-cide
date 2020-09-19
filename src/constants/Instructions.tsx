import React from 'react';
/* eslint-disable */

export type instructionsType = {
	stepNum: number;
	arrowPos: 'top' | 'right' | 'bottom';
	arrowOffset: number | string;
	isArrowOffsetDirectionInverted: boolean;
	text: JSX.Element;
};

export const instructions: instructionsType[] = [
	{
		stepNum: 0,
		arrowPos: 'top',
		arrowOffset: 7,
		isArrowOffsetDirectionInverted: false,
		text: (
			<div>
				<p>Add here the options you want to decide for.</p>
				<p>
					For example:
					<br />
					&nbsp;&nbsp;- Invest in real state
					<br />
					&nbsp;&nbsp;- Invest in shares
					<br />
					&nbsp;&nbsp;- Invest in gold
				</p>
			</div>
		),
	},
	{
		stepNum: 1,
		arrowPos: 'top',
		arrowOffset: 3.5,
		isArrowOffsetDirectionInverted: true,
		text: <p>Click here or press enter to add your entry.</p>,
	},
	{
		stepNum: 2,
		arrowPos: 'top',
		arrowOffset: 7,
		isArrowOffsetDirectionInverted: false,
		text: <p>Add at least another decision option.</p>,
	},
	{
		stepNum: 3,
		arrowPos: 'top',
		arrowOffset: 7,
		isArrowOffsetDirectionInverted: false,
		text: (
			<div>
				<p>Add here the criteria you must consider for your decision.</p>
				<p>
					Examples for an investment decision:
					<br />
					&nbsp;&nbsp;- Risks
					<br />
					&nbsp;&nbsp;- Long term profit
					<br />
					&nbsp;&nbsp;- Short term profit
					<br />
					&nbsp;&nbsp;- Monthly cash flow
				</p>
			</div>
		),
	},
	{
		stepNum: 4,
		arrowPos: 'top',
		arrowOffset: 7,
		isArrowOffsetDirectionInverted: false,
		text: (
			<div>
				<p>Add at least another criteria.</p>
			</div>
		),
	},
	{
		stepNum: 5,
		arrowPos: 'right',
		arrowOffset: 2,
		isArrowOffsetDirectionInverted: true,
		text: <p>Click here go to the next step.</p>,
	},
	{
		stepNum: 6,
		arrowPos: 'top',
		arrowOffset: '50%',
		isArrowOffsetDirectionInverted: false,
		text: (
			<div>
				<p>Move the slider right or left depending on which criteria is more important to you.</p>
			</div>
		),
	},
	{
		stepNum: 7,
		arrowPos: 'right',
		arrowOffset: 2,
		isArrowOffsetDirectionInverted: true,
		text: <p>Go to next step after you weighted every criteria.</p>,
	},
	{
		stepNum: 8,
		arrowPos: 'top',
		arrowOffset: '50%',
		isArrowOffsetDirectionInverted: false,
		text: <div />,
	},
	{
		stepNum: 9,
		arrowPos: 'right',
		arrowOffset: 2,
		isArrowOffsetDirectionInverted: true,
		text: <p>Go to next step after you rated every decision option.</p>,
	},
	{
		stepNum: 10,
		arrowPos: 'bottom',
		arrowOffset: '50%',
		isArrowOffsetDirectionInverted: false,
		text: <div />,
	},
];
