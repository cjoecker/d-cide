import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Bar, BarChart, CartesianGrid, Cell, Rectangle, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import {shallowEqual, useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';

import {HelpOutlineRounded} from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import {RootState} from '../../../../services/redux/rootReducer';
import {
  OptionAndCriteria,
  OptionsAndCriteriaKeys,
} from '../../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import InfoDialog from '../../../../components/InfoDialog';
import ComponentsTooltip from '../../../../components/ComponentsTooltip';
import InstructionsBox from '../../../../components/InstructionsBox';
import wrapWord from '../../../../services/wrapWord';
import {useEffectUnsafe} from '../../../../services/unsafeHooks';

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
  hidden: boolean;
  title: string;
  infoText: JSX.Element;
};

const ResultsChart: React.FC<Props> = (props: Props) => {
  const [localItems, setLocalItems] = useState<OptionAndCriteria[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [itemsType, setItemsType] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructionsText, setInstructionsText] = useState<JSX.Element | null>(null);

  const {hidden, itemsKey, title, infoText} = props;

  const items = useSelector((state: RootState) => state.OptionsAndCriteria[itemsKey], shallowEqual);
  const {instructionsSteps} = useSelector((state: RootState) => state.App, shallowEqual);

  const classes = useStyles();
  const theme = useTheme();

  useEffectUnsafe(() => {
    if (!hidden) {
      if (itemsKey === OptionsAndCriteriaKeys.decisionOptions) setItemsType('Decision options');
      else setItemsType('Selection criteria');
      setLocalItems(
        getSortedItems(items).map(item => {
          return {...item, name: wrapWord(item.name, 13)};
        })
      );
      setStartAnimation(true);
    } else {
      setStartAnimation(false);
    }
  }, [hidden]);

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
        itemsKey === OptionsAndCriteriaKeys.decisionOptions
          ? decisionOptionsInstructions
          : selectionCriteriaInstructions
      );
    }
  }, [localItems, itemsKey]);

  useEffect(() => {
    if (instructionsSteps === 10) setShowInstructions(true);
    else setShowInstructions(false);
  }, [instructionsSteps]);

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
          <Grid container style={{width: '100%'}}>
            <InstructionsBox show={showInstructions} customText={instructionsText} />
          </Grid>
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
                  <YAxis
                    type='category'
                    dataKey='name'
                    stroke={theme.palette.text.secondary}
                    width={theme.spacing(10)}
                  />
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
                            default:
                              return theme.palette.secondary.main;
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
