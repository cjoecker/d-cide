import React, {useEffect, useRef, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Fade from '@material-ui/core/Fade';
import {isMobile} from 'react-device-detect';
import {HelpOutlineRounded} from '@material-ui/icons';
import * as LongStrings from '../../../constants/InfoDialogTexts';
import InfoDialog from '../../../components/InfoDialog';
import {RootState} from '../../../services/redux/rootReducer';
import RatedOptionsSlice, {RatedOption} from '../../../services/redux/actionsAndSlicers/RatedOptionsSlice';
import ComponentsTooltip from '../../../components/ComponentsTooltip';
import shuffleArray from '../../../services/shuffleArray';
import {OptionAndCriteria} from '../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import InstructionsBox from '../../../components/InstructionsBox';
import AppSlice from '../../../services/redux/actionsAndSlicers/AppSlice';

const useStyles = makeStyles(theme => ({
  divMain: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(5.5),
    textAlign: 'center',
    alignContent: 'center',
  },

  infoButton: {
    marginTop: theme.spacing(1.5),
    bottom: theme.spacing(1),
    left: theme.spacing(1.5),
  },

  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },

  mainGridItem: {
    minWidth: theme.spacing(40),
    maxWidth: theme.spacing(50),
    marginTop: theme.spacing(1),
  },

  gridItemCriteriaTitle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  gridItemOptionContainer: {
    paddingBottom: theme.spacing(1),
  },

  gridItemOptionTitle: {
    paddingLeft: theme.spacing(2),
  },

  sliderTextGridLeft: {
    paddingLeft: theme.spacing(1.8),
    paddingRight: theme.spacing(1.8),
    marginTop: theme.spacing(0.5),
    textAlign: 'left',
  },

  sliderTextGridRight: {
    paddingLeft: theme.spacing(1.8),
    paddingRight: theme.spacing(1.8),
    marginTop: theme.spacing(0.5),
    textAlign: 'right',
  },

  gridItemSlider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  sliderText: {
    fontSize: 11,
    userSelect: 'none',
  },

  sliderMarks: {
    height: 8,
    width: 2,
    marginTop: -3,
    backgroundColor: theme.palette.primary.main,
  },
}));

type Props = {
  hidden: boolean;
};

//TODO improve position of good and bad when this issue is solved:
// https://github.com/mui-org/material-ui/issues/21231

const RateOptions: React.FC<Props> = (props: Props) => {
  const {hidden} = props;

  const [showInfo, setShowInfo] = useState(false);
  const [shuffledSelectionCriteria, setShuffledSelectionCriteria] = useState<OptionAndCriteria[]>([]);
  const [shuffledDecisionOptions, setShuffledDecisionOptions] = useState<OptionAndCriteria[][]>([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructionsText, setInstructionsText] = useState<JSX.Element | null>(null);

  const sliderRef = useRef<HTMLElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  const {selectionCriteria, decisionOptions} = useSelector(
    (state: RootState) => state.OptionsAndCriteria,
    shallowEqual
  );
  const {instructionsSteps} = useSelector((state: RootState) => state.App, shallowEqual);
  const ratedOptions = useSelector((state: RootState) => state.RatedOptions, shallowEqual);

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const sliderMarks = [
    {
      value: 2,
    },
    {
      value: 26,
    },
    {
      value: 50,
    },
    {
      value: 74,
    },
    {
      value: 98,
    },
  ];

  useEffect(() => {
    if (!hidden) {
      createRatedOptions();
      setShuffledSelectionCriteria(shuffleArray(selectionCriteria));
      shuffleDecisionOptions();
    }
  }, [hidden, selectionCriteria, decisionOptions]);

  useEffect(() => {
    if (instructionsSteps === 8) setShowInstructions(true);
    else setShowInstructions(false);
  }, [instructionsSteps]);

  useEffect(() => {
    setInstructionsText(
      <div>
        <p>
          How good or bad is the 
{' '}
{selectionCriteria[0].name}
          {' in '}
          {decisionOptions[0].name}
          ?
        </p>
        <p>Move the slider left or right to rate it.</p>
      </div>
    );
  }, [selectionCriteria, decisionOptions]);

  const onChange = (event: React.BaseSyntheticEvent, criteriaId: number, optionId: number, score: number) => {
    ratedOptions.forEach(option => {
      if (option.selectionCriteriaId === criteriaId && option.decisionOptionId === optionId)
        dispatch(RatedOptionsSlice.actions.updateRatedOptions({...option, score}));
    });

    if (instructionsSteps === 8) dispatch(AppSlice.actions.goToInstructionsStep(9));
  };

  const createRatedOptions = () => {
    let newRatedOption: RatedOption[] = ratedOptions;

    let id = Math.max(...ratedOptions.map(object => object.id), 0) + 1;

    decisionOptions.forEach(option => {
      selectionCriteria.forEach(criteria => {
        const foundRatedOption = ratedOptions.find(
          obj => obj.selectionCriteriaId === criteria.id && obj.decisionOptionId === option.id
        );

        if (foundRatedOption == null) {
          newRatedOption = [
            ...newRatedOption,
            {
              id,
              score: 50,
              decisionOptionId: option.id,
              selectionCriteriaId: criteria.id,
            },
          ];
          id += 1;
        }
      });
    });
    dispatch(RatedOptionsSlice.actions.setRatedOptions(newRatedOption));
  };

  const getScore = (criteriaId: number, optionId: number): number => {
    const foundRatedOption = ratedOptions.find(
      obj => obj.selectionCriteriaId === criteriaId && obj.decisionOptionId === optionId
    );

    return foundRatedOption == null ? 50 : foundRatedOption.score;
  };

  const shuffleDecisionOptions = () => {
    let newShuffledDecisionOptions: OptionAndCriteria[][] = [];

    for (let i = 0; i < selectionCriteria.length; i += 1) {
      newShuffledDecisionOptions = [...newShuffledDecisionOptions, shuffleArray(decisionOptions)];
    }

    setShuffledDecisionOptions(newShuffledDecisionOptions);
  };

  return (
    <div className={classes.divMain}>
      <Grid container justify='center' alignContent='center'>
        <Grid item xs={12}>
          <Typography component='span' variant='h1' gutterBottom>
            Rate Options
            <ComponentsTooltip title='Show help'>
              <IconButton
                data-testid='RateOptionsInfoButton'
                aria-label='Show rate options help'
                className={classes.infoButton}
                onClick={() => setShowInfo(true)}
                tabIndex={hidden ? -1 : 0}
              >
                <HelpOutlineRounded />
              </IconButton>
            </ComponentsTooltip>
          </Typography>
        </Grid>
        {!hidden &&
          shuffledSelectionCriteria.map((criteria, criteriaIndex) => (
            <Fade in timeout={500} style={{transitionDelay: `${criteriaIndex * 100}ms`}} key={criteria.id}>
              <Grid item xs={6} className={classes.mainGridItem} key={criteria.id}>
                <Paper className={classes.paper} elevation={1} key={criteria.id}>
                  <div>
                    <Grid container>
                      <Grid item xs={12} className={classes.gridItemCriteriaTitle}>
                        <Typography component='span' variant='h2'>
                          {criteria.name}
                        </Typography>
                      </Grid>
                      {shuffledDecisionOptions[criteriaIndex].map((option, optionIndex) => (
                        <Grid
                          container
                          justify='center'
                          alignItems='center'
                          className={classes.gridItemOptionContainer}
                          key={option.id}
                        >
                          <Grid item xs={4} className={classes.gridItemOptionTitle}>
                            <Typography component='span' variant='body1'>
                              {option.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={8} ref={criteriaIndex === 0 && optionIndex === 0 ? paperRef : null}>
                            <Grid container>
                              <Grid item xs={6} className={classes.sliderTextGridLeft}>
                                <Typography variant='caption' className={classes.sliderText}>
                                  Bad
                                </Typography>
                              </Grid>
                              <Grid item xs={6} className={classes.sliderTextGridRight}>
                                <Typography variant='caption' className={classes.sliderText}>
                                  Good
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                className={classes.gridItemSlider}
                                style={{marginTop: isMobile ? theme.spacing(-2.7) : theme.spacing(-2)}}
                              >
                                <Slider
                                  data-testid={`slider${criteriaIndex}${optionIndex}`}
                                  classes={{
                                    mark: classes.sliderMarks,
                                    markActive: classes.sliderMarks,
                                  }}
                                  value={getScore(criteria.id, option.id)}
                                  min={0}
                                  max={100}
                                  step={1}
                                  ref={criteriaIndex === 0 && optionIndex === 0 ? sliderRef : null}
                                  marks={sliderMarks}
                                  onChange={(event, value) => onChange(event, criteria.id, option.id, value as number)}
                                  aria-label={`Rate ${criteria.name} for ${option.name}. Slider value: ${getScore(
                                    criteria.id,
                                    option.id
                                  )}`}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </Paper>
              </Grid>
            </Fade>
          ))}
      </Grid>
      {paperRef.current && (
        <InstructionsBox
          show={showInstructions}
          anchor={sliderRef.current}
          width={paperRef.current.offsetWidth}
          customText={instructionsText}
        />
      )}
      <InfoDialog text={LongStrings.OptionsRatingInfo} show={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  );
};

export default RateOptions;
