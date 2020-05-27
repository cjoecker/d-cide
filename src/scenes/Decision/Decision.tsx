import React, {useEffect, useState} from 'react';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepButton from '@material-ui/core/StepButton';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import {StepLabel, Tooltip} from '@material-ui/core';
import {shallowEqual, useSelector} from 'react-redux';
import ReactGA from 'react-ga';
import {isEdge} from 'react-device-detect';
import theme from '../../muiTheme';
import OptionsAndCriteria from './Step1OptionsAndCriteria/OptionsAndCriteria';
import WeightCriteria from './Step2WeightCriteria/WeightCriteria';
import RateOptions from './Step3RateOptions/RateOptions';
import Results from './Step4Result/Result';
import {RootState} from '../../services/redux/rootReducer';
import {NOT_ENOUGH_CRITERIA, NOT_ENOUGH_OPTIONS} from '../../constants/Alerts';
import ButtonsTooltip from '../../components/ButtonsTooltip';

const useStyles = makeStyles({
	divMain: {
		flexGrow: 1,
		width: '100%',
		overflowX: 'hidden',
	},

	stepper: {
		backgroundColor: 'transparent',
	},
	stepperLabel: {
		marginBottom: theme.spacing(-1.5),
	},

	buttonNext: {
		position: 'fixed',
		margin: theme.spacing(0, 2, 2, 0),
	},

	buttonBack: {
		position: 'fixed',
		bottom: 'env(safe-area-inset-bottom)',
		left: 'env(safe-area-inset-left)',
		margin: theme.spacing(0, 0, 2, 2),
	},
});

type stepsType = {
	number: number;
	name: string;
	disabled: boolean;
	completed: boolean;
};

const Decision: React.FC = () => {
	const [activeStepNum, setActiveStepNum] = useState(1);
	const [loadedStepNum, setLoadedStepNum] = useState(1);
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

	const classes = useStyles();

	useEffect(() => {
		return () => {
			setActiveStepNum(0);
			setLoadedStepNum(0);
		};
	}, []);

	useEffect(() => {
		ReactGA.modalview(`Step ${loadedStepNum}`);
	}, [loadedStepNum]);

	useEffect(() => {
		disableButtons(alerts.includes(NOT_ENOUGH_OPTIONS) || alerts.includes(NOT_ENOUGH_CRITERIA));

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

	const changeStep = (stepNumber: number, element: string) => {
		setStepCompleted(activeStepNum);
		setActiveStepNum(stepNumber);
		window.scrollTo(0, 0);

		ReactGA.event({
			category: 'Change step',
			action: `Change to step ${stepNumber} with ${element}`,
		});
	};
	//TODO remove tabIndex={-1} when this ticket is solved:
	//	https://github.com/mui-org/material-ui/issues/21208
	return (
		<div className={classes.divMain}>
			<Stepper className={classes.stepper} alternativeLabel nonLinear activeStep={activeStepNum - 1}>
				{steps.map(step => {
					return (
						<Step key={step.number}>
							<ButtonsTooltip title={`Go to step ${step.number}`}>
								<StepButton
									focusRipple
									data-testid={`Step${step.number}Button`}
									onClick={() => changeStep(step.number, 'step button')}
									completed={step.completed}
									disabled={step.disabled}
									aria-label={`Go to step ${step.number}`}
								>
									<StepLabel StepIconProps={{classes: {root: classes.stepperLabel}}}>{step.name}</StepLabel>
								</StepButton>
							</ButtonsTooltip>
						</Step>
					);
				})}
			</Stepper>
			<SwipeableViews
				disabled
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={activeStepNum - 1}
				onTransitionEnd={() => {
					setLoadedStepNum(activeStepNum);
				}}
			>
				<OptionsAndCriteria hidden={loadedStepNum !== 1} />
				<WeightCriteria hidden={loadedStepNum !== 2} />
				<RateOptions hidden={loadedStepNum !== 3} />
				<Results hidden={loadedStepNum !== 4} />
			</SwipeableViews>
			{activeStepNum !== 1 ? (
				<ButtonsTooltip title='Previous step'>
					<Fab
						data-testid='PrevStepButton'
						color='secondary'
						aria-label='Previous step'
						size='medium'
						className={classes.buttonBack}
						style={{bottom: isEdge ? 10 : 'env(safe-area-inset-bottom)', left: isEdge ? 10 : 'env(safe-area-inset-left)'}}
						onClick={() => changeStep(activeStepNum - 1, 'previous button')}
					>
						<ArrowBackIcon />
					</Fab>
				</ButtonsTooltip>
			) : null}
			{activeStepNum !== steps.length ? (
				<ButtonsTooltip title='Next step'>
					<Fab
						data-testid='NextStepButton'
						color='primary'
						aria-label='Next step'
						size='medium'
						className={classes.buttonNext}
						style={{bottom: isEdge ? 10 : 'env(safe-area-inset-bottom)', right: isEdge ? 10 : 'env(safe-area-inset-right)'}}
						onClick={() => changeStep(activeStepNum + 1, 'next button')}
						disabled={disableStepButtons}
					>
						<ArrowForwardIcon />
					</Fab>
				</ButtonsTooltip>
			) : null}
		</div>
	);
};

export default Decision;
