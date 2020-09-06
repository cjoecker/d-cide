import React, {useEffect, useState} from 'react';
import {Button, IconButton, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import {shallowEqual, useSelector} from 'react-redux';
import {AnimatePresence, motion} from 'framer-motion';
import {RootState} from '../services/redux/rootReducer';
import {instructions} from '../constants/Instructions';

export interface StyleProps {
  arrowPos: 'top' | 'right';
  arrowOffset: number | string;
  invertArrowOffsetDirection: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  instructionsBox: {
    color: theme.palette.background.paper,
    backgroundColor: 'currentColor',
    position: 'relative',
    top: '0px',
    borderRadius: theme.spacing(1),
    boxShadow: '0px 0px 41px -11px rgba(0,0,0,0.7)',
    '&::after': {
      content: "''",
      position: 'absolute',
    },
  },
  instructionsBoxTop: {
    left: '0px',
    '&::after': {
      left: ({arrowOffset, invertArrowOffsetDirection}) =>
        getConditionalPos(!invertArrowOffsetDirection, arrowOffset, theme),
      right: ({arrowOffset, invertArrowOffsetDirection}) =>
        getConditionalPos(invertArrowOffsetDirection, arrowOffset, theme),
      top: '-13px',
      borderLeft: `7px solid transparent`,
      borderRight: `7px solid transparent`,
      borderBottom: `14px solid currentColor`,
      marginLeft: '-6px',
    },
  },
  instructionsBoxRight: {
    left: '5px',
    marginRight: '20px',
    flex: 1,
    '&::after': {
      top: ({arrowOffset, invertArrowOffsetDirection}) =>
        getConditionalPos(!invertArrowOffsetDirection, arrowOffset, theme),
      bottom: ({arrowOffset, invertArrowOffsetDirection}) =>
        getConditionalPos(invertArrowOffsetDirection, arrowOffset, theme),
      right: '-13px',
      borderTop: `7px solid transparent`,
      borderBottom: `7px solid transparent`,
      borderLeft: `14px solid currentColor`,
    },
  },
  closeButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(-1),
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    float: 'right',
  },
  linkButton: {
    textTransform: 'none',
    textDecoration: 'underline',
    marginTop: theme.spacing(-1.5),
    fontWeight: 'normal',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  typography: {
    margin: theme.spacing(0, 2, 0, 2),
  },
  gridContainer: {
    paddingLeft: ({arrowPos}) => (arrowPos === 'right' ? 5 : 0),
    width: '100%',
  },
}));

const getConditionalPos = (condition: boolean, offset: string | number, theme: Theme) => {
  if (!condition) return null;

  if (typeof offset === 'string') return offset;

  return theme.spacing(offset);
};

const startAnimation = {
  visible: {
    scale: 1,
    transition: {
      type: 'spring',
      delay: 0.2,
      stiffness: 200,
    },
  },
  hidden: {scale: 0, duration: 0.2},
};

//TODO check if after animation button can be tabbed

type ComponentsTooltipProps = {
  show: boolean;
  customText?: JSX.Element | null;
};

const InstructionsBox = (props: ComponentsTooltipProps) => {
  const {show, customText} = props;

  const [isVisible, setIsVisible] = useState(true);
  const {instructionsSteps, showInstructions} = useSelector((state: RootState) => state.App, shallowEqual);

  const classes = useStyles(instructions[instructionsSteps]);

  const {arrowPos} = instructions[instructionsSteps];

  const arrowClass = arrowPos === 'top' ? classes.instructionsBoxTop : classes.instructionsBoxRight;

  const loopAnimation = {
    to: {
      translateY: arrowPos === 'top' ? -5 : undefined,
      translateX: arrowPos === 'top' ? undefined : -10,
      transition: {
        delay: 0.2,
        duration: 0.5,
        yoyo: Infinity,
        when: 'afterChildren',
        ease: 'easeInOut',
      },
    },
    from: {translateY: 0},
  };

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    setIsVisible(show);
  }, [instructionsSteps]);

  return (
    <>
      {isVisible && showInstructions && (
        <Grid container className={classes.gridContainer} justify='flex-end' alignContent='flex-start'>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              style={{width: arrowPos === 'top' ? '100%' : undefined}}
              variants={loopAnimation}
              initial='from'
              animate='to'
            >
              <motion.div variants={startAnimation} initial='hidden' animate='visible' exit='hidden'>
                <motion.div className={`${classes.instructionsBox} ${arrowClass}`} layout>
                  <Grid container justify='center' alignContent='flex-start'>
                    <div className={classes.typography}>
                      <Typography component='span' variant='body1' align='left' color='secondary'>
                        <IconButton
                          aria-label='delete'
                          className={classes.closeButton}
                          onClick={() => setIsVisible(false)}
                        >
                          <CloseIcon fontSize='small' />
                        </IconButton>
                        {customText ?? instructions[instructionsSteps].text}
                      </Typography>
                    </div>
                    <Button
                      className={classes.linkButton}
                      data-testid='dontShowMoreHelp'
                      onClick={() => setIsVisible(false)}
                      color='primary'
                    >
                      Don&apos;t show help anymore
                    </Button>
                  </Grid>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </Grid>
      )}
    </>
  );
};

export default InstructionsBox;
