import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import {shallowEqual, useSelector} from 'react-redux';
import {AnimatePresence, motion} from 'framer-motion';
import {RootState} from '../services/redux/rootReducer';
import {instructions} from '../constants/Instructions';

export interface StyleProps {
	arrowPos: 'top' | 'right' | 'bottom' | 'left';
	arrowOffset: number;
	invertArrowOffsetDirection: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
	instructionsBox: {
		color: theme.palette.background.paper,
		display: 'flex',
		backgroundColor: 'currentColor',
		position: 'relative',
		top: '0px',
		left: '0px',
		width: '100%',
		height: '100%',
		borderRadius: theme.spacing(1),
		boxShadow: '0px 0px 41px -11px rgba(0,0,0,0.7)',
		// animation: `$myEffect 2000ms`,
		// animationIterationCount: 'infinite',
		// animationTimingFunction: 'easeInOutSine',
	},
	instructionsBoxLeft: {
		'&::after': {
			content: "''",
			position: 'absolute',
			left: ({arrowOffset, invertArrowOffsetDirection}) =>
				!invertArrowOffsetDirection ? theme.spacing(arrowOffset) : null,
			right: ({arrowOffset, invertArrowOffsetDirection}) =>
				invertArrowOffsetDirection ? theme.spacing(arrowOffset) : null,
			top: '-14px',
			width: '0px',
			height: '0px',
			borderLeft: `7px solid transparent`,
			borderRight: `7px solid transparent`,
			borderBottom: `14px solid currentColor`,
		},
	},
	'@keyframes myEffect': {
		'0%': {
			transform: 'translateY(0%)',
		},
		'50%': {
			transform: 'translateY(-7%)',
		},
		'100%': {
			transform: 'translateY(0)',
		},
	},
	'@keyframes popOut': {
		'0%': {
			transform: 'scale(0)',
		},
		'80%': {
			transform: 'scale(1.2)',
		},
		'100%': {
			transform: 'scale(1)',
		},
	},
	text: {
		color: 'black',
	},
	closeButton: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(-2),
		backgroundColor: theme.palette.background.paper,
		boxShadow: 'none',
	},
	linkButton: {
		textTransform: 'none',
		textDecoration: 'underline',
		marginTop: theme.spacing(-1.5),
		marginLeft: theme.spacing(1),
		fontWeight: 'normal',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	typography: {
		margin: theme.spacing(0, 0, 0, 2),
	},
}));

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

const loopAnimation = {
	to: {
		translateY: -5,
		transition: {
			delay: 1.5,
			duration: 0.5,
			yoyo: Infinity,
			when: 'afterChildren',
			ease: 'easeInOut',
		},
	},
	from: {translateY: 0},
};

//TODO check if after animation button can be tabbed

type ComponentsTooltipProps = {
	show: boolean;
};

const InstructionsBox = (props: ComponentsTooltipProps) => {
	const {show} = props;

	const [isVisible, setIsVisible] = useState(true);
	const {instructionsSteps} = useSelector((state: RootState) => state.App, shallowEqual);

	useEffect(() => {
		setIsVisible(show);
	}, [show]);

	useEffect(() => {
		setIsVisible(show);
	}, [instructionsSteps]);

	const classes = useStyles(instructions[instructionsSteps]);

	return (
		<AnimatePresence exitBeforeEnter>
			{isVisible && (
				<motion.div variants={loopAnimation} initial={'from'} animate={'to'}>
					<motion.div
						className={`${classes.instructionsBox} ${classes.instructionsBoxLeft}`}
						variants={startAnimation}
						initial={'hidden'}
						animate={'visible'}
						exit={'hidden'}
					>
						<Grid container justify='flex-start' alignContent='flex-start'>
							<Grid item xs={10}>
								<div className={classes.typography}>
									<Typography component='span' variant='body1' align='left' color='secondary'>
										{instructions[instructionsSteps].text}
									</Typography>
								</div>
							</Grid>
							<Grid item xs={2}>
								<IconButton aria-label='delete' className={classes.closeButton} onClick={() => setIsVisible(false)}>
									<CloseIcon fontSize='small' />
								</IconButton>
							</Grid>
							<Grid item justify='flex-start' alignContent='flex-start' xs={12}>
								<Box top={0} left={0} position='relative' display='flex' alignItems='left' justifyContent='left'>
									<Button
										className={classes.linkButton}
										data-testid='dontShowMoreHelp'
										onClick={() => setIsVisible(false)}
										color='primary'
									>
										Don&apos;t show help anymore
									</Button>
								</Box>
							</Grid>
						</Grid>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default InstructionsBox;
