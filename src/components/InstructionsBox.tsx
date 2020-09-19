import React, {useEffect, useState} from 'react';
import {Button, IconButton, Popper, Theme, useTheme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {AnimatePresence, motion} from 'framer-motion';
import {RootState} from '../services/redux/rootReducer';
import {instructions} from '../constants/Instructions';
import ComponentsTooltip from './ComponentsTooltip';
import {useEffectUnsafe} from '../services/unsafeHooks';
import AppSlice from '../services/redux/actionsAndSlicers/AppSlice';

export interface StyleProps {
	arrowPos: 'top' | 'right' | 'bottom';
	arrowOffset: number | string;
	isArrowOffsetDirectionInverted: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
	instructionsBox: {
		color: theme.palette.background.paper,
		backgroundColor: 'currentColor',
		position: 'relative',
		top: '0px',
		borderRadius: '5px',
		boxShadow: '0px 0px 41px -11px rgba(0,0,0,0.7)',
		'&::after': {
			content: "''",
			position: 'absolute',
		},
	},
	instructionsBoxTop: {
		left: '0px',
		'&::after': {
			left: ({arrowOffset, isArrowOffsetDirectionInverted}) =>
				getConditionalPos(!isArrowOffsetDirectionInverted, arrowOffset, theme),
			right: ({arrowOffset, isArrowOffsetDirectionInverted}) =>
				getConditionalPos(isArrowOffsetDirectionInverted, arrowOffset, theme),
			top: '-13px',
			borderLeft: `7px solid transparent`,
			borderRight: `7px solid transparent`,
			borderBottom: `14px solid currentColor`,
			marginLeft: '-6px',
		},
	},
	instructionsBoxBottom: {
		left: '0px',
		'&::after': {
			left: ({arrowOffset, isArrowOffsetDirectionInverted}) =>
				getConditionalPos(!isArrowOffsetDirectionInverted, arrowOffset, theme),
			right: ({arrowOffset, isArrowOffsetDirectionInverted}) =>
				getConditionalPos(isArrowOffsetDirectionInverted, arrowOffset, theme),
			bottom: '-13px',
			borderLeft: `7px solid transparent`,
			borderRight: `7px solid transparent`,
			borderTop: `14px solid currentColor`,
			marginLeft: '-6px',
		},
	},
	instructionsBoxRight: {
		left: '5px',
		marginRight: '20px',
		flex: 1,
		'&::after': {
			top: ({arrowOffset, isArrowOffsetDirectionInverted}) =>
				getConditionalPos(!isArrowOffsetDirectionInverted, arrowOffset, theme),
			bottom: ({arrowOffset, isArrowOffsetDirectionInverted}) =>
				getConditionalPos(isArrowOffsetDirectionInverted, arrowOffset, theme),
			right: '-13px',
			borderTop: `7px solid transparent`,
			borderBottom: `7px solid transparent`,
			borderLeft: `14px solid currentColor`,
		},
	},
	closeButton: {
		margin: theme.spacing(1, -1, 0, 1),
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

type ComponentsTooltipProps = {
	isVisible: boolean;
	customText?: JSX.Element | null;
	width?: string | number;
	anchor?: HTMLElement | null;
};

const InstructionsBox = (props: ComponentsTooltipProps) => {
	const {isVisible, customText, width, anchor} = props;

	// eslint-disable-next-line @typescript-eslint/camelcase
	const [_isVisible, set_isVisible] = useState(true);
	const {instructionsStepNum, areInstructionsVisible} = useSelector((state: RootState) => state.App, shallowEqual);

	useEffect(() => {
		console.log(instructionsStepNum);
	}, [instructionsStepNum]);

	const theme = useTheme();
	const classes = useStyles(instructions[instructionsStepNum]);
	const dispatch = useDispatch();

	const {arrowPos} = instructions[instructionsStepNum];
	const arrowClass = classes[`instructionsBox${arrowPos.charAt(0).toUpperCase()}${arrowPos.slice(1)}`];
	const isHiddenPermanently = localStorage.getItem('hideHelp') === 'true';

	const handleClickDontShowHelpAnymore = () => {
		localStorage.setItem('hideHelp', 'true');
		set_isVisible(false);
		dispatch(AppSlice.actions.goToInstructionsStep(0));
	};

	useEffect(() => {
		set_isVisible(isVisible);
	}, [isVisible]);

	useEffectUnsafe(() => {
		set_isVisible(isVisible);
	}, [instructionsStepNum]);

	const box = (
		<Grid
			container
			className={classes.gridContainer}
			justify={arrowPos === 'right' ? 'flex-end' : 'center'}
			alignContent='flex-start'
		>
			<AnimatePresence exitBeforeEnter>
				{_isVisible && areInstructionsVisible && !isHiddenPermanently && (
					<motion.div
						style={{width: anchor ? undefined : width}}
						variants={loopAnimation(arrowPos)}
						initial='from'
						animate='to'
					>
						<motion.div variants={startAnimation} initial='hidden' animate='visible' exit='hidden'>
							<motion.div className={`${classes.instructionsBox} ${arrowClass}`} layout>
								<Grid container justify='center' alignContent='flex-start' direction='column'>
									<Grid item xs={12} className={classes.typography}>
										<ComponentsTooltip>
											<IconButton
												aria-label='Close dialog'
												data-testid='hideHelp'
												className={classes.closeButton}
												onClick={() => set_isVisible(false)}
											>
												<CloseIcon fontSize='small' />
											</IconButton>
										</ComponentsTooltip>
										<div style={{marginRight: theme.spacing(5)}}>
											<Typography component='span' variant='body1' align='left' color='secondary'>
												{customText ?? instructions[instructionsStepNum].text}
											</Typography>
										</div>
									</Grid>
									<Grid container justify='center'>
										<Button
											className={classes.linkButton}
											data-testid='dontShowMoreHelp'
											onClick={handleClickDontShowHelpAnymore}
											color='primary'
										>
											Don&apos;t show help anymore
										</Button>
									</Grid>
								</Grid>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</Grid>
	);

	const withPopper = _isVisible && anchor && (
		<Popper
			style={{marginTop: theme.spacing(2), width, zIndex: 1000}}
			id='popper'
			open
			anchorEl={anchor}
			placement='bottom'
			modifiers={{
				flip: {
					enabled: false,
				},
			}}
		>
			{box}
		</Popper>
	);

	const component = anchor ? withPopper : box;

	return <>{_isVisible && component}</>;
};
export default InstructionsBox;

const getConditionalPos = (shouldReturnPos: boolean, offset: string | number, theme: Theme) => {
	if (!shouldReturnPos) return null;

	if (typeof offset === 'string') return offset;

	return theme.spacing(offset);
};

const startAnimation = {
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			type: 'spring',
			delay: 0.2,
			stiffness: 200,
		},
	},
	hidden: {scale: 0, opacity: 0, duration: 0.2},
};

const loopAnimation = (arrowPos: 'top' | 'right' | 'bottom') => ({
	to: {
		translateY: arrowPos === 'right' ? undefined : -5,
		translateX: arrowPos === 'right' ? -10 : undefined,
		transition: {
			delay: 0.2,
			duration: 0.5,
			yoyo: Infinity,
			when: 'afterChildren',
			ease: 'easeInOut',
		},
	},
	from: {translateY: 0},
});
