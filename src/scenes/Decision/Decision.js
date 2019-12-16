import React, {Component} from 'react';
import OptionsAndCriteria from "../1_OptionsAndCriteria/OptionsAndCriteria";
import Result from "../4_Result/Result";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Step from "@material-ui/core/Step/Step";
import Stepper from "@material-ui/core/Stepper/Stepper";
import StepButton from "@material-ui/core/es/StepButton/StepButton";
import Fab from "@material-ui/core/Fab/Fab";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import OptionsRating from "../3_RateOptions/RateOptions";
import WeightCriteria from "../2_WeightCriteria/WeightCriteria";

import {connect} from "react-redux";
import ReactGA from "react-ga";


function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
        root: {
            flexGrow: 1,
            width: '100%',
            overflowX: 'hidden', //Avoid negative margin from mainGrid
        },

        stepper: {
            marginTop: theme.spacing.unit * 6,
            backgroundColor: 'transparent',
        },


        nextButton: {
            position: 'fixed',
            bottom: 0,
            right: 0,
            margin: theme.spacing.unit * 1,
        },

        backButton: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            margin: theme.spacing.unit * 1,
        },


    })
;

function getSteps() {
    return ['Write options and criteria', 'Weight criteria', 'Rate options', 'Result'];
}


class Decision extends Component {


    constructor(props) {
        super(props);

        this.getStepContent = this.getStepContent.bind(this);

        this.state = {
            activeStep: 0,
            stepComplete: {},
            decisionId: 0,
        };
    }

    componentDidMount() {
        this.setState({decisionId: this.props.match.params.decisionId});
    }


    handleNext = () => {
        if (!isNaN(this.state.activeStep)) {
            ReactGA.event({
                category: 'Decision',
                action: 'Go To Next Step',
                value: this.state.activeStep + 1
            });
        }


        //Mark Step as Done
        this.changeStepDone();

        //Change Step
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));

    };

    handleBack = () => {

        if (!isNaN(this.state.activeStep)) {
            ReactGA.event({
                category: 'Decision',
                action: 'Go To Prev Step',
                value: this.state.activeStep - 1
            });
        }

        //Mark Step as Done
        this.changeStepDone();

        //Change Step
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));


    };


    handleStep = step => () => {

        if (!isNaN(step)) {
            ReactGA.event({
                category: 'Decision',
                action: 'Jump To Step',
                value: step
            });
        }


        //Mark Step as Done
        this.changeStepDone();

        //Change Step
        this.setState({
            activeStep: step,
        });
    };

    changeStepDone() {

        let stepComplete = this.state.stepComplete;
        stepComplete[this.state.activeStep] = true;

        this.setState({
            stepComplete: stepComplete,
        });
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <OptionsAndCriteria
                    decisionId={this.props.match.params.decisionId}
                />;
            case 1:
                return <WeightCriteria
                    decisionId={this.props.match.params.decisionId}
                />;
            case 2:
                return <OptionsRating
                    decisionId={this.props.match.params.decisionId}
                />;
            case 3:
                return <Result
                    decisionId={this.props.match.params.decisionId}
                />;
            default:
                return 'Unknown stepIndex';
        }
    }

    render() {

        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;

        const minItemsThere =
            !(this.props.optionsAndCriteria.decisionOptions.length >= 2 &&
                this.props.optionsAndCriteria.selectionCriteria.length >= 2);

        const stepDisabled = [
            false,
            minItemsThere,
            minItemsThere,
            minItemsThere,
        ];

        return (
            <div className={classes.root}>
                <Stepper className={classes.stepper} alternativeLabel nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepButton
                                    onClick={this.handleStep(index)}
                                    completed={this.state.stepComplete[index]}
                                    disabled={stepDisabled[index]}>
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>

                {this.getStepContent(activeStep)}


                {/*Navigation Buttons*/}
                {activeStep !== 0 ?
                    <Fab color="secondary"
                         aria-label="Previous Step"
                         size="medium"
                         className={classes.backButton}
                         onClick={this.handleBack}
                    >
                        <ArrowBackIcon/>
                    </Fab> : null}

                {activeStep !== 3 ?
                    <Fab color="primary"
                         aria-label="Next Step"
                         size="medium"
                         className={classes.nextButton}
                         onClick={this.handleNext}
                         disabled={minItemsThere}
                    >
                        <ArrowForwardIcon/>
                    </Fab> : null}
            </div>
        );
    }
}


Decision.propTypes = {
    classes: PropTypes.object.isRequired,
    optionsAndCriteria: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    app: state.app,
    optionsAndCriteria: state.optionsAndCriteria
});


export default connect(mapStateToProps, null)(withStyles(styles)(Decision));

