import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	ResponsiveContainer,
	BarChart,
	XAxis,
	YAxis,
	Bar,
	Rectangle,
	Cell,
	CartesianGrid,
} from "recharts";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	OptionAndCriteria,
	OptionsAndCriteriaKeys,
} from "../../../../services/redux/OptionsAndCriteriaSlice";
import { RootState } from "../../../../services/redux/rootReducer";
import theme from "../../../../muiTheme";
import { getOptionsAndCriteria } from "../../../../services/redux/OptionsAndCriteriaActions";

const useStyles = makeStyles({
	divMain: {
		padding: theme.spacing(0.8),
	},

	bars: {
		width: theme.spacing(19),
	},
});

interface Props {
	itemsKey: OptionsAndCriteriaKeys;
	hidden: boolean;
	YKey: string;
}

const ResultsChart: React.FC<Props> = (props: Props) => {
	const [labelsOffset, setLabelsOffset] = useState(0);
	const [localItems, setLocalItems] = useState<OptionAndCriteria[]>([]);

	const items = useSelector(
		(state: RootState) => state.OptionsAndCriteria[props.itemsKey],
		shallowEqual
	);

	const { decisionId } = useParams();
	const { hidden, itemsKey, YKey } = props;

	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!hidden) getOptionsAndCriteria(dispatch, decisionId, itemsKey, true);
		else {
			setLocalItems([]);
		}
	}, [hidden]);

	useEffect(() => {
		if (items.length !== localItems.length && !hidden) {
			setLocalItems(items);
			calculateLabelsOffset();
		}
	}, [items]);

	const calculateLabelsOffset = () => {
		const labelsMaxCharsNum = 18;
		const maxNumOffset = 35;
		const widthOffset = 100;

		const longest = Math.max(...items.map((item) => item.name.length));

		const totalOffset =
			(longest / labelsMaxCharsNum) * maxNumOffset + widthOffset;

		setLabelsOffset(totalOffset);
	};

	return (
		<div className={classes.divMain}>
			<ResponsiveContainer height={items.length * 70 + 10} width="100%">
				<BarChart
					data={items}
					margin={{ top: 5, right: 40, left: 40, bottom: 20 }}
					layout="vertical"
					barCategoryGap="20%"
					barGap={2}
					maxBarSize={10}
				>
					<CartesianGrid
						horizontal={false}
						stroke="#a0a0a0"
						strokeWidth={0.5}
					/>
					<XAxis
						type="number"
						axisLine={false}
						stroke="#a0a0a0"
						domain={[0, 10]}
						ticks={[0, 2.5, 5, 7.5, 10]}
						strokeWidth={0.5}
					/>
					<YAxis type="category" dataKey={YKey} width={labelsOffset} />
					<Bar
						dataKey="score"
						animationDuration={1000}
						label={{
							position: "right",
							backgroundColor: "#fff",
						}}
						shape={
							<Rectangle className={classes.bars} radius={[0, 10, 10, 0]} />
						}
					>
						{items.map((entry, index) => (
							<Cell
								key={`cell-${entry.id}`}
								fill={() => {
									switch (index) {
										case 0:
											return "#0f61a0";
										case 1:
											return "#646464";
										default:
											return "#a0a0a0";
									}
								}}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ResultsChart;
