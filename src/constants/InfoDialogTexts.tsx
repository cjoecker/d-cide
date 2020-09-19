import React from 'react';
/* eslint-disable */
//Info Texts
export const DecisionOptionInfo = (
	<div>
		<h1
			style={{
				textAlign: 'left',
			}}
		>
			Decision Options
		</h1>
		<p>
			Write every decision option you need to decide for.
			<br />
			For example, if you want to make an investment, your decision options may look like this:
		</p>
		<ul>
			<li>Invest in gold</li>
			<li>Invest in shares</li>
			<li>Invest in real state</li>
		</ul>
		<p>
			Take some time to think about every other option "out of the box" that may also exist.
			<br />
			<br />
			In case you have a binary decision (yes/no), you should write two decision options. <br />
			For example:
			<ul>
				<li>Invest money</li>
				<li>Don't invest money</li>
			</ul>
		</p>
	</div>
);

export const SelectionCriteriaInfo = (
	<div>
		<h1
			style={{
				textAlign: 'left',
			}}
		>
			Selection Criteria
		</h1>
		<p>Write every important selection criteria that play a role in your decision.</p>
		<p>
			If you need to decide where to invest your savings:
			<ul>
				<li>Risks</li>
				<li>Long term profit</li>
				<li>Short term profit</li>
				<li>Monthly cash flow</li>
			</ul>
		</p>
	</div>
);

export const WeightCriteriaInfo = (
	<div>
		<h1
			style={{
				textAlign: 'left',
			}}
		>
			Weight Criteria
		</h1>
		<p>
			Decisions require always trade-offs. If not, no decision will be necessary.
			<br />
			Under this principle, you should weight your selection criteria.
			<br />
			Which of both criteria are you willing to sacrifice to get the other one?
			<br />
			<br />
			Move the slider to the left or right depending on what is more important to you.
			<br />
			The distance moved in the slider is proportional to the importance of criteria compared to the other.
			<br />
			This as the slider would be a balance between both criteria.
		</p>
	</div>
);

export const OptionsRatingInfo = (
	<div>
		<h1
			style={{
				textAlign: 'left',
			}}
		>
			Rate Options
		</h1>
		<p>
			Rate every decision option for every selection criteria.
			<br />
			Move the slider to the right or left rate it.
		</p>
	</div>
);

export const OptionsResultInfo = (
	<div>
		<h1
			style={{
				textAlign: 'left',
			}}
		>
			Decision Options Ranking
		</h1>
		<p>
			The chart shows you the best option based on your previous input.
			<br />
			It's shown on a scale from 0 to 10, being 10 the best possible rating.
			<br />
			<br />
			The best option is the one with the highest scores in the most important criteria for you. It's also the one, in
			which you are facing the minimum amount of trade-offs.
		</p>
	</div>
);

export const CriteriaResultInfo = (
	<div>
		<h1
			style={{
				textAlign: 'left',
			}}
		>
			Selection Criteria Ranking
		</h1>
		<p>The chart shows you on a scale from 0 to 10, which criteria is the most important for your decision.</p>
	</div>
);
