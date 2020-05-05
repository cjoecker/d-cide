import React, { useEffect, useState } from "react";
import Step from "@material-ui/core/Step";
import Stepper from "@material-ui/core/Stepper";
import StepButton from "@material-ui/core/StepButton";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { StepLabel } from "@material-ui/core";
import { shallowEqual, useSelector } from "react-redux";
import theme from "../../muiTheme";
import OptionsAndCriteria from "./Step1OptionsAndCriteria/OptionsAndCriteria";
import WeightCriteria from "./Step2WeightCriteria/WeightCriteria";
import RateOptions from "./Step3RateOptions/RateOptions";
import Results from "./Step4Result/Result";
import { RootState } from "../../redux/rootReducer";
import { NOT_ENOUGH_CRITERIA, NOT_ENOUGH_OPTIONS } from "../../constants/Alerts";

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
		bottom: 0,
		right: 0,
		margin: theme.spacing(1),
	},

	buttonBack: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		margin: theme.spacing(1),
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
		disableButtons(alerts.includes(NOT_ENOUGH_OPTIONS) || alerts.includes(NOT_ENOUGH_CRITERIA));
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

	const changeStep = (stepNumber: number) => {
		setStepCompleted(activeStepNum);

		setActiveStepNum(stepNumber);
	};

	return (
		<div className={classes.divMain}>
			<Stepper className={classes.stepper} alternativeLabel nonLinear activeStep={activeStepNum - 1}>
				{steps.map(step => {
					return (
						<Step key={step.number}>
							<StepButton
								data-testid={`Step${step.number}Button`}
								onClick={() => changeStep(step.number)}
								completed={step.completed}
								disabled={step.disabled}
							>
								<StepLabel StepIconProps={{classes: {root: classes.stepperLabel}}}>{step.name}</StepLabel>
							</StepButton>
						</Step>
					);
				})}
			</Stepper>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={activeStepNum - 1}
				onTransitionEnd={() => setLoadedStepNum(activeStepNum)}
			>
				<OptionsAndCriteria hidden={loadedStepNum !== 1} />
				<WeightCriteria hidden={loadedStepNum !== 2} />
				<RateOptions hidden={loadedStepNum !== 3} />
				<Results hidden={loadedStepNum !== 4} />
			</SwipeableViews>
			{activeStepNum !== 1 ? (
				<Fab
					data-testid='PrevStepButton'
					color='secondary'
					aria-label='Previous Step'
					size='medium'
					className={classes.buttonBack}
					onClick={() => changeStep(activeStepNum - 1)}
				>
					<ArrowBackIcon />
				</Fab>
			) : null}
			{activeStepNum !== steps.length ? (
				<Fab
					data-testid='NextStepButton'
					color='primary'
					aria-label='Next Step'
					size='medium'
					className={classes.buttonNext}
					onClick={() => changeStep(activeStepNum + 1)}
					disabled={disableStepButtons}
				>
					<ArrowForwardIcon />
				</Fab>
			) : null}
		</div>
	);
};

export default Decision;
