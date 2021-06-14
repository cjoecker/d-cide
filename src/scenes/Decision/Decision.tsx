import {StepLabel} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {AnimatePresence, motion} from 'framer-motion';
import React, {useEffect, useState} from 'react';
import {isEdge} from 'react-device-detect';
import ReactGA from 'react-ga';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import ComponentsTooltip from '../../components/ComponentsTooltip';
import InstructionsBox from '../../components/InstructionsBox';
import {NOT_ENOUGH_CRITERIA, NOT_ENOUGH_OPTIONS} from '../../constants/Alerts';
import AppSlice from '../../services/redux/actionsAndSlicers/AppSlice';
import {RootState} from '../../services/redux/rootReducer';
import {useEffectUnsafe} from '../../services/unsafeHooks';

import OptionsAndCriteria from './Step1OptionsAndCriteria/OptionsAndCriteria';
import WeightCriteria from './Step2WeightCriteria/WeightCriteria';
import RateOptions from './Step3RateOptions/RateOptions';
import Results from './Step4Result/Result';

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

const Decision: React.FC = () => {
	const [[activeStepNum, direction], setActiveStepNum] = useState([1, 0]);

	const [areStepButtonsDisabled, setAreStepButtonsDisabled] = useState(false);
	const [steps, setSteps] = useState<stepsType[]>(initialStepsState);

	const {alerts} = useSelector((state: RootState) => state.App, shallowEqual);
	const {instructionsStepNum} = useSelector((state: RootState) => state.App, shallowEqual);

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

	const disableButtons = (isDisabled: boolean) => {
		setAreStepButtonsDisabled(isDisabled);
		setSteps(
			steps.map(step => {
				if (step.number > 1) {
					return {...step, isDisabled};
				}
				return step;
			})
		);
	};

	const setStepCompleted = (stepNum: number) => {
		const newSteps = [...steps];
		const index = newSteps.findIndex(obj => obj.number === stepNum);
		newSteps[index].isCompleted = true;

		setSteps(newSteps);
	};

	const handleStepChange = (newDirection: number, element: string) => {
		dispatch(AppSlice.actions.setAreInstructionsVisible(false));
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

		if (instructionsStepNum === 5 && activeStepNum === 1) {
			dispatch(AppSlice.actions.goToInstructionsStep(6));
		}
		if (instructionsStepNum === 7 && activeStepNum === 2) {
			dispatch(AppSlice.actions.goToInstructionsStep(8));
		}
		if (instructionsStepNum === 9 && activeStepNum === 3) {
			dispatch(AppSlice.actions.goToInstructionsStep(10));
		}
	};

	const stepsComponents = [
		<OptionsAndCriteria key={'firstStep'} />,
		<WeightCriteria key={'secondStep'} />,
		<RateOptions key={'thirdStep'} />,
		<Results key={'fourthStep'} />,
	];

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
									onClick={() => handleStepChange(step.number - activeStepNum, 'step button')}
									completed={step.isCompleted}
									disabled={step.isDisabled}
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
					onExitComplete={() => dispatch(AppSlice.actions.setAreInstructionsVisible(true))}
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
								onClick={() => handleStepChange(-1, 'previous button')}
							>
								<ArrowBackIcon />
							</Fab>
						</ComponentsTooltip>
					)}
				</Grid>
				<Grid style={{width: '100%', zIndex: 2000}} item>
					<InstructionsBox
						show={
							(instructionsStepNum === 5 && activeStepNum === 1) ||
							(instructionsStepNum === 7 && activeStepNum === 2) ||
							(instructionsStepNum === 9 && activeStepNum === 3)
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
								onClick={() => handleStepChange(1, 'next button')}
								disabled={areStepButtonsDisabled}
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

type stepsType = {
	number: number;
	name: string;
	isDisabled: boolean;
	isCompleted: boolean;
};

const initialStepsState = [
	{
		number: 1,
		name: 'Options and selection criteria',
		isDisabled: false,
		isCompleted: false,
	},
	{
		number: 2,
		name: 'Weight criteria',
		isDisabled: false,
		isCompleted: false,
	},
	{
		number: 3,
		name: 'Rate options',
		isDisabled: false,
		isCompleted: false,
	},
	{
		number: 4,
		name: 'Result',
		isDisabled: false,
		isCompleted: false,
	},
];

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
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
