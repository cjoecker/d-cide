import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Bar, BarChart, CartesianGrid, Cell, Rectangle, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import {shallowEqual, useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';

import {RootState} from '../../../../services/redux/rootReducer';
import {
	OptionAndCriteria,
	OptionsAndCriteriaKeys,
} from '../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import InfoDialog from '../../../../components/InfoDialog';
import ComponentsTooltip from '../../../../components/ComponentsTooltip';
import {HelpOutlineRounded} from '@material-ui/icons';

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
		bottom: theme.spacing(0.25),
		left: theme.spacing(1.2),
	},

	bars: {
		width: theme.spacing(190),
		boxShadow: `inset 1px 1px 2px rgba(0, 0, 0, 0.5), inset -1px -1px 2px rgba(180, 180, 180, 0.4)`,
	},
}));

type Props = {
	itemsKey: OptionsAndCriteriaKeys;
	hidden: boolean;
	title: string;
	infoText: JSX.Element;
};

const ResultsChart: React.FC<Props> = (props: Props) => {
	const [localItems, setLocalItems] = useState<OptionAndCriteria[]>([]);
	const [showInfo, setShowInfo] = useState(false);
	const [startAnimation, setStartAnimation] = useState(false);
	const [itemsType, setItemsType] = useState('');

	const {hidden, itemsKey, title, infoText} = props;

	const items = useSelector((state: RootState) => state.OptionsAndCriteria[itemsKey], shallowEqual);

	const classes = useStyles();
	const theme = useTheme();

	useEffect(() => {
		if (!hidden) {
			if (itemsKey === OptionsAndCriteriaKeys.decisionOptions) setItemsType('Decision options');
			else setItemsType('Selection criteria');
			setLocalItems(wrapLongWords(getSortedItems(items)));
			setStartAnimation(true);
		} else {
			setStartAnimation(false);
		}
	}, [hidden]);

	const wrapLongWords = (originalItems: OptionAndCriteria[]) => {
		const maxCharsPerLine = 13;

		return originalItems.map(item => {
			if (item.name.length > maxCharsPerLine) {
				const breakLongWords = new RegExp(`([^s]{${maxCharsPerLine}})`, 'g');
				const dropLastDash = new RegExp(`-\n$`, 'g');

				const newName = item.name.replace(breakLongWords, '$1-\n').replace(dropLastDash, '');

				return {...item, name: newName};
			}
			return item;
		});
	};

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
								onClick={() => setShowInfo(true)}
								tabIndex={hidden ? -1 : 0}
							>
								<HelpOutlineRounded />
							</IconButton>
						</ComponentsTooltip>
					</Typography>
					{!hidden && (
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
										animationDuration={1000}
										label={{
											position: 'right',
										}}
										shape={<Rectangle radius={[0, 10, 10, 0]} />}
									>
										{localItems.map((entry, index) => (
											<Cell
												key={entry.id}
												fill={(() => {
													switch (index) {
														case 0:
															return theme.palette.primary.main;
														case 1:
															return theme.palette.secondary.main;
														default:
															return theme.palette.text.secondary;
													}
												})()}
											/>
										))}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</Typography>
					)}
				</Paper>
			</Fade>
			<InfoDialog text={infoText} show={showInfo} onClose={() => setShowInfo(false)} />
		</div>
	);
};

export default ResultsChart;
