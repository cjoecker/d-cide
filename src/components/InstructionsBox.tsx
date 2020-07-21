import React, {useEffect, useState} from 'react';
import {Button, IconButton, Popper, Theme} from '@material-ui/core';
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
		width: '100%',
		height: '100%',
		borderRadius: theme.spacing(1),
		boxShadow: '0px 0px 41px -11px rgba(0,0,0,0.7)',
		'&::after': {
			content: "''",
			position: 'absolute',
			width: '0px',
			height: '0px',
		},
	},
	instructionsBoxTop: {
		left: '0px',
		'&::after': {
			left: ({arrowOffset, invertArrowOffsetDirection}) =>
				!invertArrowOffsetDirection ? theme.spacing(arrowOffset) : null,
			right: ({arrowOffset, invertArrowOffsetDirection}) =>
				invertArrowOffsetDirection ? theme.spacing(arrowOffset) : null,
			top: '-13px',
			borderLeft: `7px solid transparent`,
			borderRight: `7px solid transparent`,
			borderBottom: `14px solid currentColor`,
		},
	},
	instructionsBoxRight: {
		left: '-20px',
		'&::after': {
			top: ({arrowOffset, invertArrowOffsetDirection}) =>
				!invertArrowOffsetDirection ? theme.spacing(arrowOffset) : null,
			bottom: ({arrowOffset, invertArrowOffsetDirection}) =>
				invertArrowOffsetDirection ? theme.spacing(arrowOffset) : null,
			right: '-13px',
			borderTop: `7px solid transparent`,
			borderBottom: `7px solid transparent`,
			borderLeft: `14px solid currentColor`,
		},
	},
	text: {
		color: 'black',
	},
	closeButton: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
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
	div: {
		maxWidth: '300px',
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

//TODO check if after animation button can be tabbed

type ComponentsTooltipProps = {
	show: boolean;
	anchor?: any;
};

const InstructionsBox = (props: ComponentsTooltipProps) => {
	const {show, anchor} = props;

	const [isVisible, setIsVisible] = useState(true);
	const {instructionsSteps} = useSelector((state: RootState) => state.App, shallowEqual);

	const classes = useStyles(instructions[instructionsSteps]);

	const arrowPos = instructions[instructionsSteps].arrowPos;

	const arrowClass = arrowPos === 'top' ? classes.instructionsBoxTop : classes.instructionsBoxRight;

	const loopAnimation = {
		to: {
			translateY: arrowPos === 'top' ? -5 : undefined,
			translateX: arrowPos === 'top' ? undefined : -5,
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

	const box = (
		<div className={classes.div}>
			<AnimatePresence exitBeforeEnter>
				<motion.div variants={loopAnimation} initial={'from'} animate={'to'}>
					<motion.div variants={startAnimation} initial={'hidden'} animate={'visible'} exit={'hidden'}>
						<motion.div className={`${classes.instructionsBox} ${arrowClass}`} layout>
							<Grid container justify='flex-end' alignContent='flex-start'>
								<Grid item xs={10}>
									<div className={classes.typography}>
										<Typography component='span' variant='body1' align='left' color='secondary'>
											{instructions[instructionsSteps].text}
										</Typography>
									</div>
								</Grid>
								<Grid xs={2}>
									<Grid container justify='flex-end' alignContent='flex-end'>
										<IconButton aria-label='delete' className={classes.closeButton} onClick={() => setIsVisible(false)}>
											<CloseIcon fontSize='small' />
										</IconButton>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Button
										className={classes.linkButton}
										data-testid='dontShowMoreHelp'
										onClick={() => setIsVisible(false)}
										color='primary'
									>
										Don&apos;t show help anymore
									</Button>
								</Grid>
							</Grid>
						</motion.div>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</div>
	);

	const withPopper = (
		<>
			<Popper open placement='left-end' anchorEl={anchor}>
				{box}
			</Popper>
		</>
	);

	const component = anchor ? withPopper : box;

	return <>{isVisible && component}</>;
};

export default InstructionsBox;
