import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Rectangle,
	ResponsiveContainer,
	XAxis,
	YAxis,
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
import Fade from "@material-ui/core/Fade";
import {log} from "util";

const useStyles = makeStyles({
	divMain: {
		paddingTop: theme.spacing(0.8),
		paddingLeft: theme.spacing(0.8),
		paddingRight: theme.spacing(0.8),
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
	const [startAnimation, setStartAnimation] = useState(false);

	const items = useSelector(
		(state: RootState) => state.OptionsAndCriteria[props.itemsKey],
		shallowEqual
	);

	const { decisionId } = useParams();
	const { hidden, itemsKey, YKey } = props;

	const classes = useStyles();
	const dispatch = useDispatch();

	//TODO show axis values

	useEffect(() => {
		if (!hidden) getOptionsAndCriteria(dispatch, decisionId, itemsKey, true);
		else {
			setLocalItems([]);
			setStartAnimation(false);
		}
	}, [hidden]);

	useEffect(() => {
		if (items.length !== localItems.length && !hidden) {
			setLocalItems(items);
			calculateLabelsOffset();
			setStartAnimation(true);
		}
	}, [items]);



	const calculateLabelsOffset = () => {
		const labelsMaxCharsNum = 18;
		const maxNumOffset = 35;
		const widthOffset = 100;

		const longest = Math.max(...localItems.map((item) => item.name.length));

		return (longest / labelsMaxCharsNum) * maxNumOffset + widthOffset;
	};

	return (
		<div className={classes.divMain}>
   <Fade
				in={startAnimation}
				timeout={500}
				style={{
					transitionDelay: `200ms`,
				}}
			>

				<ResponsiveContainer height={localItems.length * 70 + 10} width="100%">
					<BarChart
						data={localItems}
						margin={{
							top: theme.spacing(0),
							right: theme.spacing(5),
							left: theme.spacing(5),
							bottom: theme.spacing(1),
						}}
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
							dataKey="score"
							type="number"
							axisLine={false}
							stroke="#a0a0a0"
							domain={[0, 10]}
							ticks={[0, 2.5, 5, 7.5, 10]}
							strokeWidth={0.5}
						/>
						<YAxis type="category" dataKey={YKey} width={calculateLabelsOffset()}/>
						<Bar
							dataKey="score"
							animationDuration={1000}
							label={{
								position: "right",
								backgroundColor: "#fff",
							}}
							shape={
								<Rectangle className={classes.bars} radius={[0, 10, 10, 0]}/>
							}
						>
							{localItems.map((entry, index) => (
								<Cell
									key={`cell-${entry.id}`}
									fill={(() => {
										switch (index) {
											case 0:
												return "#0f61a0";
											case 1:
												return "#646464";
											default:
												return "#a0a0a0";
										}
									})()}
								/>
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</Fade>
		</div>
	);
};

export default ResultsChart;
