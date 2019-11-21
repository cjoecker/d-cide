import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import ResultsChart from "./components/ResultsChart";
import InfoIcon from '@material-ui/icons/Info';
import IconButton from "@material-ui/core/IconButton/IconButton";
import InfoDialog from "../../components/InfoDialog";
import Typography from "@material-ui/core/Typography";
import * as LongStrings from "../../components/LongStrings";
import ReactGA from 'react-ga';
import connect from "react-redux/es/connect/connect";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    mainDiv: {
        paddingTop: theme.spacing.unit * 2.5,
        paddingBottom: theme.spacing.unit * 5.5,
    },

    cell: {
        maxWidth: theme.spacing.unit * 75,
        minWidth: theme.spacing.unit * 38,
        margin: theme.spacing.unit * 2,
    },

    infoButton: {
        bottom: theme.spacing.unit * 0.25,
        left: theme.spacing.unit * 1.2,
    },

    titleText: {
        margin: theme.spacing.unit * 1,
        textAlign: "center",
        marginTop: theme.spacing.unit * 1,
    },
});



class Result extends Component {

    constructor(props) {
        super(props);
        this.hideInfo = this.hideInfo.bind(this);
        this.showInfo = this.showInfo.bind(this);

        this.state = {
            optionsInfo: false,
            criteriaInfo: false,
            isLoading: true,
        };
    }


    hideInfo(e, name) {
        this.setState({[name]: false,});

        ReactGA.event({
            category: 'Result',
            action: 'Hide Info from ' + name,
        });
    };

    showInfo(e, name){
        this.setState({ [name]: true });

        ReactGA.event({
            category: 'Result',
            action: 'Show Info from ' + name,
        });
    };


    render() {

        const {classes} = this.props;
        const {isFetchingDataPackage} = this.props.app;


        return (

            <div className={classes.mainDiv}>
                <Grid container justify="center" alignContent='center' spacing={24}>
                    <Grid className={classes.cell} key="1" item xs={12}>
                        <Paper className={classes.paper} elevation={2} key={"Option"}>

                            <Typography variant="h5" className={classes.titleText} gutterBottom>
                                Decision Options Ranking
                                <IconButton
                                    aria-label="Help"
                                    className={classes.infoButton}
                                    onClick={(e) => this.showInfo(e,"optionsInfo")}>
                                    <InfoIcon color="secondary"/>
                                </IconButton>
                            </Typography>
                            {!isFetchingDataPackage &&
                            <ResultsChart
                                itemsKey={"decisionOption"}
                                projectId={this.props.projectId}
                                YKey={"name"}/>
                            }

                        </Paper>
                    </Grid>
                    <Grid className={classes.cell} key="2" item xs={12}>
                        <Paper className={classes.paper} elevation={2} key={"Criteria"}>
                            <Typography variant="h5" className={classes.titleText} gutterBottom>
                                Selection Criteria Ranking
                                <IconButton
                                    aria-label="Help"
                                    className={classes.infoButton}
                                    onClick={(e) => this.showInfo(e,"criteriaInfo")}>
                                    <InfoIcon color="secondary"/>
                                </IconButton>
                            </Typography>
                            {!isFetchingDataPackage &&
                            <ResultsChart
                                itemsKey={"selectionCriteria"}
                                projectId={this.props.projectId}
                                YKey={"name"}/>
                            }
                        </Paper>
                    </Grid>
                </Grid>
                {/*Info Dialogs*/}
                <InfoDialog
                    title={"Decision Options Ranking"}
                    text={LongStrings.OptionsResultInfo}
                    show={this.state.optionsInfo}
                    hide={(e) => this.hideInfo(e,"optionsInfo")}
                />
                <InfoDialog
                    title={"Selection Criteria Ranking"}
                    text={LongStrings.CriteriaResultInfo}
                    show={this.state.criteriaInfo}
                    hide={(e) => this.hideInfo(e,"criteriaInfo")}
                />
            </div>
        )
    }
}

Result.propTypes = {
    classes: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    app: state.app
});

export default connect(mapStateToProps, {})(withStyles(styles)(Result));
