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
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { getOptionsAndCriteria } from "../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaActions";
import theme from "../../../../muiTheme";
import { RootState } from "../../../../services/redux/rootReducer";
import {
	OptionAndCriteria,
	OptionsAndCriteriaKeys,
} from "../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice";
import InfoDialog from "../../../../components/InfoDialog";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles({
	divMain: {
		paddingTop: theme.spacing(0.8),
		paddingLeft: theme.spacing(0.8),
		paddingRight: theme.spacing(0.8),
	},
	title: {
		paddingTop: theme.spacing(2),
	},
	infoButton: {
		bottom: theme.spacing(0.25),
		left: theme.spacing(1.2),
	},

	bars: {
		width: theme.spacing(19),
	},
});

interface Props {
	itemsKey: OptionsAndCriteriaKeys;
	hidden: boolean;
	YKey: string;
	title: string;
	infoText: JSX.Element;
}

const ResultsChart: React.FC<Props> = (props: Props) => {
	const [localItems, setLocalItems] = useState<OptionAndCriteria[]>([]);
	const [showInfo, setShowInfo] = useState(false);
	const [startAnimation, setStartAnimation] = useState(false);

	const items = useSelector(
		(state: RootState) => state.OptionsAndCriteria[props.itemsKey],
		shallowEqual
	);

	const { decisionId } = useParams();
	const { hidden, itemsKey, YKey, title, infoText } = props;

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
			setStartAnimation(true);
		}
	}, [items]);

	const getYAxisWidth = () => {
		const labelsMaxCharsNum = 18;
		const maxNumOffset = 35;
		const widthOffset = 100;

		const longest = Math.max(...localItems.map((item) => item.name.length));

		return (longest / labelsMaxCharsNum) * maxNumOffset + widthOffset;
	};

	return (
		<div className={classes.divMain}>
			<Fade in={startAnimation} timeout={500}>
				<Paper elevation={2} key="Option">
					<Typography variant="h5" gutterBottom className={classes.title}>
						{title}
						<IconButton
							aria-label="Help"
							className={classes.infoButton}
							onClick={() => setShowInfo(true)}
						>
							<InfoIcon color="secondary" />
						</IconButton>
					</Typography>
					<ResponsiveContainer
						height={localItems.length * 70 + 10}
						width="100%"
					>
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
								dy={-5}
								axisLine={false}
								tickLine={false}
								domain={[0, 10]}
								ticks={[0, 2.5, 5, 7.5, 10]}
								strokeWidth={0.5}
								stroke="#a0a0a0"
								tick={{ fontSize: "0.8rem" }}
							/>
							<YAxis type="category" dataKey={YKey} width={getYAxisWidth()} />
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
				</Paper>
			</Fade>
			<InfoDialog
				text={infoText}
				show={showInfo}
				onClose={setShowInfo(false)}
			/>
		</div>
	);
};

export default ResultsChart;
