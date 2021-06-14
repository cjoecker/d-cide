import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {HelpOutlineRounded} from '@material-ui/icons';
import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {Bar, BarChart, CartesianGrid, Cell, Rectangle, ResponsiveContainer, XAxis, YAxis, LabelList} from 'recharts';

import ComponentsTooltip from '../../../../components/ComponentsTooltip';
import InfoDialog from '../../../../components/InfoDialog';
import InstructionsBox from '../../../../components/InstructionsBox';
import {
	OptionAndCriteria,
	OptionsAndCriteriaKeys,
} from '../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import {RootState} from '../../../../services/redux/rootReducer';
import {useEffectUnsafe} from '../../../../services/unsafeHooks';
import wrapWord from '../../../../services/wrapWord';

const useStyles = makeStyles(theme => ({
	divMain: {
		paddingTop: theme.spacing(0.8),
		paddingLeft: theme.spacing(0.8),
		paddingRight: theme.spacing(0.8),
	},
	title: {
		padding: theme.spacing(2, 3, 0, 3),
	},
	chartContainer: {
		marginLeft: theme.spacing(2),
	},
	infoButton: {
		marginTop: theme.spacing(1.5),
		bottom: theme.spacing(1),
		left: theme.spacing(1.5),
	},
	bars: {
		width: theme.spacing(190),
		boxShadow: `inset 1px 1px 2px rgba(0, 0, 0, 0.5), inset -1px -1px 2px rgba(180, 180, 180, 0.4)`,
	},
}));

type Props = {
	itemsKey: OptionsAndCriteriaKeys;
	isVisible: boolean;
	title: string;
	infoText: JSX.Element;
};

const ResultsChart: React.FC<Props> = (props: Props) => {
	const [localItems, setLocalItems] = useState<OptionAndCriteria[]>([]);
	const [isInfoVisible, setIsInfoVisible] = useState(false);
	const [startAnimation, setStartAnimation] = useState(true);
	const [itemsType, setItemsType] = useState('');
	const [areInstructionsVisible, setAreInstructionsVisible] = useState(false);
	const [instructionsText, setInstructionsText] = useState<JSX.Element | null>(null);

	const {isVisible, itemsKey, title, infoText} = props;

	const items = useSelector((state: RootState) => state.OptionsAndCriteria[itemsKey], shallowEqual);
	const {instructionsStepNum} = useSelector((state: RootState) => state.App, shallowEqual);

	const classes = useStyles();
	const theme = useTheme();

	useEffectUnsafe(() => {
		const newOrderedItems = getSortedItems(items).map(item => {
			return {...item, name: wrapWord(item.name, 13)};
		});

		if (isVisible && JSON.stringify(newOrderedItems) !== JSON.stringify(localItems)) {
			if (itemsKey === OptionsAndCriteriaKeys.decisionOptions) {setItemsType('Decision options');}
			else {setItemsType('Selection criteria');}
			setLocalItems(newOrderedItems);
			setStartAnimation(true);
		}
	}, [isVisible, items]);

	useEffect(() => {
		if (localItems.length > 1) {
			const decisionOptionsInstructions = (
				<div>
					<p>
						{`${localItems[0].name} `}
						is the best decision option for you.
						<br />
						The second best option is
						{` ${localItems[1].name}.`}
					</p>
				</div>
			);

			const selectionCriteriaInstructions = (
				<div>
					<p>
						The most important criteria for your decision is
						{` ${localItems[0].name}. `}
					</p>
				</div>
			);

			setInstructionsText(
				itemsKey === OptionsAndCriteriaKeys.decisionOptions ? decisionOptionsInstructions : selectionCriteriaInstructions
			);
		}
	}, [localItems, itemsKey]);

	useEffect(() => {
		if (instructionsStepNum === 10) {setAreInstructionsVisible(true);}
		else {setAreInstructionsVisible(false);}
	}, [instructionsStepNum]);

	const getSortedItems = (itemsLocal: OptionAndCriteria[]): OptionAndCriteria[] => {
		return [...itemsLocal].sort((a, b) => {
			return b.score - a.score;
		});
	};

	return (
		<div className={classes.divMain} data-testid={`${itemsKey}Diagram`}>
			<Fade in={startAnimation} timeout={500}>
				<Paper elevation={1} key='Option'>
					<Typography variant='h2' gutterBottom className={classes.title}>
						{title}
						<ComponentsTooltip title='Show help'>
							<IconButton
								data-testid={`${itemsKey}ResultsInfoButton`}
								aria-label={`Show help for ${itemsType} results`}
								className={classes.infoButton}
								onClick={() => setIsInfoVisible(true)}
								tabIndex={isVisible ? 0 : -1}
							>
								<HelpOutlineRounded />
							</IconButton>
						</ComponentsTooltip>
					</Typography>
					<Grid container style={{width: '100%'}}>
						<InstructionsBox show={areInstructionsVisible} customText={instructionsText} />
					</Grid>
					{isVisible && (
						<Typography component='span' variant='body1'>
							<ResponsiveContainer
								id={`${itemsKey}ResponsiveContainer`}
								height={localItems.length * theme.spacing(9) + theme.spacing(5)}
								width='98%'
								className={classes.chartContainer}
							>
								<BarChart
									data={localItems}
									margin={{
										top: theme.spacing(0),
										right: theme.spacing(5),
										left: theme.spacing(5),
										bottom: theme.spacing(1),
									}}
									layout='vertical'
									barCategoryGap='20%'
									maxBarSize={10}
								>
									<CartesianGrid horizontal={false} stroke={theme.palette.text.secondary} strokeWidth={0.5} />
									<XAxis
										dataKey='score'
										type='number'
										dy={-5}
										axisLine={false}
										tickLine={false}
										domain={[0, 10]}
										ticks={[0, 2.5, 5, 7.5, 10]}
										stroke={theme.palette.text.secondary}
										tick={{fontSize: '0.8rem'}}
									/>
									<YAxis type='category' dataKey='name' stroke={theme.palette.text.secondary} width={theme.spacing(10)} />
									<Bar
										dataKey='score'
										animationBegin={500}
										animationDuration={1000}
										shape={<Rectangle radius={[0, 10, 10, 0]} />}
									>
										{localItems.map((entry, index) => (
											<Cell
												key={entry.id}
												fill={(() => {
													switch (index) {
														case 0:
															return theme.palette.primary.main;
														default:
															return theme.palette.secondary.main;
													}
												})()}
											/>
										))}
										<LabelList dataKey='score' position="right" />
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</Typography>
					)}
				</Paper>
			</Fade>
			<InfoDialog text={infoText} isVisible={isInfoVisible} onClose={() => setIsInfoVisible(false)} />
		</div>
	);
};

export default ResultsChart;
