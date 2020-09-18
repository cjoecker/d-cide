import React, {useEffect, useState} from 'react';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepButton from '@material-ui/core/StepButton';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {makeStyles} from '@material-ui/core/styles';
import {StepLabel} from '@material-ui/core';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import ReactGA from 'react-ga';
import {isEdge} from 'react-device-detect';

import Grid from '@material-ui/core/Grid';
import {AnimatePresence, motion} from 'framer-motion';
import OptionsAndCriteria from './Step1OptionsAndCriteria/OptionsAndCriteria';
import WeightCriteria from './Step2WeightCriteria/WeightCriteria';
import RateOptions from './Step3RateOptions/RateOptions';
import Results from './Step4Result/Result';
import {RootState} from '../../services/redux/rootReducer';
import {NOT_ENOUGH_CRITERIA, NOT_ENOUGH_OPTIONS} from '../../constants/Alerts';
import ComponentsTooltip from '../../components/ComponentsTooltip';
import InstructionsBox from '../../components/InstructionsBox';
import AppSlice from '../../services/redux/actionsAndSlicers/AppSlice';
import {useEffectUnsafe} from '../../services/unsafeHooks';

const useStyles = makeStyles(theme => ({
	divMain: {
		width: '100%',
		overflowX: 'hidden',
	},
	divStepsContainer: {
		display: 'grid',
	},
	divSteps: {
		width: '100vw',
		gridArea: '1 / 1 / 2 / 2',
	},
	stepper: {
		backgroundColor: 'transparent',
	},
	gridButtons: {
		position: 'fixed',
		width: '100%',
		bottom: 0,
		padding: theme.spacing(0, 2, 2, 0),
		pointerEvents: 'none',
		zIndex: 1000,
	},
	stepperLabel: {
		marginBottom: theme.spacing(-1.5),
	},
	buttonNext: {
		zIndex: 1000,
		pointerEvents: 'auto',
	},
	buttonBack: {
		position: 'fixed',
		margin: theme.spacing(0, 0, 2, 2),
		zIndex: 1000,
		pointerEvents: 'auto',
	},
}));

type stepsType = {
	number: number;
	name: string;
	disabled: boolean;
	completed: boolean;
};

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};

const Decision: React.FC = () => {
	const [[activeStepNum, direction], setActiveStepNum] = useState([1, 0]);

	const [disableStepButtons, setDisableStepButtons] = useState(false);
	const [steps, setSteps] = useState<stepsType[]>([
		{
			number: 1,
			name: 'Options and selection criteria',
			disabled: false,
			completed: false,
		},
		{
			number: 2,
			name: 'Weight criteria',
			disabled: false,
			completed: false,
		},
		{
			number: 3,
			name: 'Rate options',
			disabled: false,
			completed: false,
		},
		{
			number: 4,
			name: 'Result',
			disabled: false,
			completed: false,
		},
	]);

	const {alerts} = useSelector((state: RootState) => state.App, shallowEqual);
	const {instructionsSteps} = useSelector((state: RootState) => state.App, shallowEqual);

	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		ReactGA.modalview(`Step ${activeStepNum}`);
	}, [activeStepNum]);

	useEffectUnsafe(() => {
		disableButtons(
			JSON.stringify(alerts).includes(JSON.stringify(NOT_ENOUGH_OPTIONS)) ||
				JSON.stringify(alerts).includes(JSON.stringify(NOT_ENOUGH_CRITERIA))
		);

		alerts.forEach(alert =>
			ReactGA.event({
				category: 'Alerts',
				action: `Show alert ${alert.text}`,
			})
		);
	}, [alerts]);

	const disableButtons = (disabled: boolean) => {
		setDisableStepButtons(disabled);
		setSteps(
			steps.map(step => {
				if (step.number > 1) return {...step, disabled};
				return step;
			})
		);
	};

	const setStepCompleted = (stepNumber: number) => {
		const newSteps = [...steps];
		const index = newSteps.findIndex(obj => obj.number === stepNumber);
		newSteps[index].completed = true;

		setSteps(newSteps);
	};

	const changeStep = (newDirection: number, element: string) => {
		dispatch(AppSlice.actions.setShowInstructions(false));
		const newStep = activeStepNum + newDirection;
		setStepCompleted(activeStepNum);

		setTimeout(() => {
			setActiveStepNum([newStep, newDirection]);
		}, 0);

		window.scrollTo(0, 0);
		ReactGA.event({
			category: 'Change step',
			action: `Change to step ${newStep} with ${element}`,
		});

		if (instructionsSteps === 5 && activeStepNum === 1) dispatch(AppSlice.actions.goToInstructionsStep(6));
		if (instructionsSteps === 7 && activeStepNum === 2) dispatch(AppSlice.actions.goToInstructionsStep(8));
		if (instructionsSteps === 9 && activeStepNum === 3) dispatch(AppSlice.actions.goToInstructionsStep(10));
	};

	const stepsComponents = [<OptionsAndCriteria />, <WeightCriteria />, <RateOptions />, <Results />];

	return (
		<div className={classes.divMain}>
			<Stepper className={classes.stepper} alternativeLabel nonLinear activeStep={activeStepNum - 1}>
				{steps.map(step => {
					return (
						<Step key={step.number}>
							<ComponentsTooltip>
								<StepButton
									focusRipple
									data-testid={`Step${step.number}Button`}
									onClick={() => changeStep(step.number - activeStepNum, 'step button')}
									completed={step.completed}
									disabled={step.disabled}
									aria-label={`Go to step ${step.number}`}
								>
									<StepLabel StepIconProps={{classes: {root: classes.stepperLabel}}}>{step.name}</StepLabel>
								</StepButton>
							</ComponentsTooltip>
						</Step>
					);
				})}
			</Stepper>
			<div className={classes.divStepsContainer}>
				<AnimatePresence
					initial={false}
					custom={direction}
					onExitComplete={() => dispatch(AppSlice.actions.setShowInstructions(true))}
				>
					<motion.div
						className={classes.divSteps}
						key={activeStepNum}
						custom={direction}
						variants={variants}
						initial='enter'
						animate='center'
						exit='exit'
						transition={{
							x: {type: 'spring', stiffness: 200, damping: 25, mass: 2, restSpeed: 1},
							opacity: {duration: 0.5},
						}}
					>
						{stepsComponents[activeStepNum - 1]}
					</motion.div>
				</AnimatePresence>
			</div>
			<Grid container className={classes.gridButtons} justify='flex-end' alignItems='flex-end' wrap='nowrap'>
				<Grid item>
					{activeStepNum !== 1 && (
						<ComponentsTooltip>
							<Fab
								data-testid='PrevStepButton'
								color='secondary'
								aria-label='Previous step'
								size='medium'
								className={classes.buttonBack}
								style={{
									bottom: isEdge ? 10 : 'env(safe-area-inset-bottom)',
									left: isEdge ? 10 : 'env(safe-area-inset-left)',
								}}
								onClick={() => changeStep(-1, 'previous button')}
							>
								<ArrowBackIcon />
							</Fab>
						</ComponentsTooltip>
					)}
				</Grid>
				<Grid style={{width: '100%', zIndex: 2000}} item>
					<InstructionsBox
						show={
							(instructionsSteps === 5 && activeStepNum === 1) ||
							(instructionsSteps === 7 && activeStepNum === 2) ||
							(instructionsSteps === 9 && activeStepNum === 3)
						}
					/>
				</Grid>
				<Grid item>
					{activeStepNum !== steps.length && (
						<ComponentsTooltip>
							<Fab
								data-testid='NextStepButton'
								color='primary'
								aria-label='Next step'
								size='medium'
								className={classes.buttonNext}
								onClick={() => changeStep(1, 'next button')}
								disabled={disableStepButtons}
								style={{
									marginBottom: isEdge ? 10 : 'env(safe-area-inset-bottom',
									marginRight: isEdge ? 10 : 'env(safe-area-inset-right)',
								}}
							>
								<ArrowForwardIcon />
							</Fab>
						</ComponentsTooltip>
					)}
				</Grid>
			</Grid>
		</div>
	);
};

export default Decision;
