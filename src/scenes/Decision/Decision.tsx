import React, {useState } from "react";
import Step from "@material-ui/core/Step";
import Stepper from "@material-ui/core/Stepper";
import StepButton from "@material-ui/core/StepButton";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../muiTheme";

const useStyles = makeStyles({
	divMain: {
		flexGrow: 1,
		width: "100%",
		overflowX: "hidden", //Avoid negative margin from mainGrid
	},

	stepper: {
		marginTop: theme.spacing(6),
		backgroundColor: "transparent",
	},

	buttonNext: {
		position: "fixed",
		bottom: 0,
		right: 0,
		margin: theme.spacing(1),
	},

	buttonBack: {
		position: "fixed",
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
	const [steps, setSteps] = useState<stepsType[]>([
		{
			number: 1,
			name: "Options and criteria",
			disabled: false,
			completed: false,
		},
		{
			number: 2,
			name: "Weight criteria",
			disabled: false,
			completed: false,
		},
		{
			number: 3,
			name: "Rate options",
			disabled: false,
			completed: false,
		},
		{
			number: 4,
			name: "Result",
			disabled: false,
			completed: false,
		},
	]);

	const classes = useStyles();

	const setStepCompleted = (stepNumber: number): void => {
		const newSteps = [...steps];
		const index = newSteps.findIndex((obj) => obj.number === stepNumber);
		newSteps[index].completed = true;
		
		setSteps(newSteps);
	};

	const changeStep = (stepNumber: number): void => {
		setStepCompleted(stepNumber);

		setActiveStepNum(stepNumber);
	};

	// TODO disable steps

	// getStepContent(stepIndex) {
	// 	switch (stepIndex) {
	// 		case 0:
	// 			return (
	// 				<OptionsAndCriteria decisionId={this.props.match.params.decisionId} />
	// 			);
	// 		case 1:
	// 			return (
	// 				<WeightCriteria decisionId={this.props.match.params.decisionId} />
	// 			);
	// 		case 2:
	// 			return (
	// 				<OptionsRating decisionId={this.props.match.params.decisionId} />
	// 			);
	// 		case 3:
	// 			return <Result decisionId={this.props.match.params.decisionId} />;
	// 		default:
	// 			return "Unknown stepIndex";
	// 	}
	// }

	return (
		<div className={classes.divMain}>
			<Stepper
				className={classes.stepper}
				alternativeLabel
				nonLinear
				activeStep={activeStepNum}
			>
				{steps.map((step) => {
					return (
						<Step key={step.number}>
							<StepButton
								onClick={(): void => changeStep(step.number)}
								completed={step.completed}
								disabled={step.disabled}
							>
								{step.name}
							</StepButton>
						</Step>
					);
				})}
			</Stepper>

			{activeStepNum}

			{/*Navigation Buttons*/}
			{activeStepNum !== 0 ? (
				<Fab
					color="secondary"
					aria-label="Previous Step"
					size="medium"
					className={classes.buttonBack}
					onClick={(): void => changeStep(activeStepNum - 1)}
				>
					<ArrowBackIcon />
				</Fab>
			) : null}

			{activeStepNum !== steps.length - 1 ? (
				<Fab
					color="primary"
					aria-label="Next Step"
					size="medium"
					className={classes.buttonNext}
					onClick={(): void => changeStep(activeStepNum + 1)}
					// disabled={minItemsThere}
				>
					<ArrowForwardIcon />
				</Fab>
			) : null}
		</div>
	);
};

export default Decision;
