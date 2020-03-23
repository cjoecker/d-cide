import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import RateSlider_Scale from "../../../images/RateSlider_Scale.svg";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import InfoDialog from "../../../components/InfoDialog";
import * as LongStrings from "../../../services/LongTexts";
import { connect } from "react-redux";
import {
  getRatedOptions,
  putRatedOption,
} from "../../../services/actions/RatedOptions_Action";
import ReactGA from "react-ga";
import Fade from "@material-ui/core/Fade";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

let onChange$ = new Subject();

const styles = (theme) => ({
  div_main: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(5.5),
    textAlign: "center",
    alignContent: "center",
  },

  infoButton: {
    bottom: theme.spacing(0.25),
    left: theme.spacing(1),
  },

  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },

  gridItem_title: {
    minWidth: theme.spacing(40),
    maxWidth: theme.spacing(50),
  },

  gridItem_gridContainer: {
    paddingBottom: theme.spacing(1),
  },

  gridItem_gridContainer_title: {
    paddingLeft: theme.spacing(2),
  },

  slider_textLeft: {
    paddingLeft: theme.spacing(1.8),
    paddingRight: theme.spacing(1.8),
    marginTop: theme.spacing(1),
    textAlign: "left",
  },

  slider_textRight: {
    paddingLeft: theme.spacing(1.8),
    paddingRight: theme.spacing(1.8),
    marginTop: theme.spacing(1),
    textAlign: "right",
  },

  gridItem_slider: {
    marginTop: -theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  slider_mark: {
    height: 8,
    width: 1,
    marginTop: -3,
    backgroundColor: theme.palette.primary.main,
  },

  slider_track: {
    opacity: 100,
  },

  emptySpace: {
    height: theme.spacing(4),
  },
});

const marks = [
  {
    value: 2,
  },
  {
    value: 26,
  },
  {
    value: 50,
  },
  {
    value: 74,
  },
  {
    value: 98,
  },
];

class RateOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratedCriteria: [],
      showInfo: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onHideInfo = this.onHideInfo.bind(this);
    this.onShowInfo = this.onShowInfo.bind(this);
  }

  //Load Data from Server
  componentDidMount() {
    this.props.getRatedOptions(this.props.decisionId);

    const subscription = onChange$
      .pipe(debounceTime(500))
      .subscribe((data) => this.fetchSliderValues(data));

    // prevent memory leaks
    this.setState((prevState) => ({ ...prevState, subscription }));
  }

  componentWillUnmount() {
    // prevent memory leaks
    this.state.subscription.unsubscribe();
  }

  //Refresh when redux state changes
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.rateOptions.ratedCriteria !==
      this.props.rateOptions.ratedCriteria
    ) {
      this.setRatedOptions();
    }
  }

  onChange = (event, criteriaIndex, optionIndex, score) => {
    //send data to fetch
    const ratedOption = {
      score: score,
      decisionOptionId: this.state.ratedCriteria[criteriaIndex].decisionOption[
        optionIndex
      ].id,
      selectionCriteriaId: this.state.ratedCriteria[criteriaIndex].id,
    };

    onChange$.next(ratedOption);

    //Update State
    let ratedCriteriaLocal = this.state.ratedCriteria;

    ratedCriteriaLocal[criteriaIndex].decisionOption[optionIndex].score = score;

    this.setState({
      ratedCriteria: ratedCriteriaLocal,
    });
  };

  fetchSliderValues(ratedOption) {
    this.props.putRatedOption(this.props.decisionId, ratedOption);
  }

  onHideInfo() {
    this.setState({ showInfo: false });

    ReactGA.event({
      category: "Rate Options",
      action: "Hide Info",
    });
  }

  onShowInfo = () => {
    this.setState({ showInfo: true });
    ReactGA.event({
      category: "Rate Options",
      action: "Show Info",
    });
  };

  setRatedOptions() {
    //get basic data
    let { selectionCriteria } = this.props.optionsAndCriteria;
    let { decisionOptions } = this.props.optionsAndCriteria;
    let importedRatedCriteria = [];
    let ratedCriteria = [];

    importedRatedCriteria = this.props.rateOptions.ratedCriteria;

    //Create nested object to summarize list
    selectionCriteria.forEach(function (criteria) {
      let decisionOptionLocal = [];

      //Add object properties
      decisionOptions.forEach(function (option) {
        let optionLocal = Object.assign({}, option);

        //Get old scores
        let objIndex = importedRatedCriteria.findIndex(
          (obj) =>
            obj.selectionCriteriaId === criteria.id &&
            obj.decisionOptionId === option.id
        );

        //Add scores if existing
        optionLocal.score =
          objIndex >= 0 ? importedRatedCriteria[objIndex].score : 50;

        decisionOptionLocal = [...decisionOptionLocal, optionLocal];
      });

      //add objects to array
      criteria.decisionOption = decisionOptionLocal;
      ratedCriteria = [...ratedCriteria, criteria];
    });

    this.setState({ ratedCriteria: ratedCriteria });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.div_main}>
        <Grid container justify="center" alignContent="center" spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Rate Options
              <IconButton
                aria-label="Help"
                className={classes.infoButton}
                onClick={this.onShowInfo}
              >
                <InfoIcon color="secondary" />
              </IconButton>
            </Typography>
          </Grid>
          {this.state.ratedCriteria.map((criteria, criteriaIndex) => (
            <Fade
              in={true}
              style={{ transitionDelay: `${criteriaIndex * 100}ms` }}
            >
              <Grid
                item
                xs={6}
                className={classes.gridItem_title}
                key={criteria.id}
              >
                <Paper
                  className={classes.paper}
                  elevation={2}
                  key={criteria.id}
                >
                  <div>
                    <Grid container spacing={16}>
                      <Grid item xs={12}>
                        <Typography variant="h6">{criteria.name}</Typography>
                      </Grid>
                      {criteria.decisionOption.map((option, optionIndex) => (
                        <Grid
                          container
                          justify="center"
                          alignItems="center"
                          className={classes.gridItem_gridContainer}
                          key={option.id}
                        >
                          <Grid
                            item
                            xs={4}
                            className={classes.gridItem_gridContainer_title}
                          >
                            {option.name}
                          </Grid>
                          <Grid item xs={8}>
                            <Grid container>
                              <Grid
                                item
                                xs={6}
                                className={classes.slider_textLeft}
                              >
                                <Typography
                                  variant="caption"
                                  style={{ fontSize: 11 }}
                                >
                                  Bad
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                className={classes.slider_textRight}
                              >
                                <Typography
                                  variant="caption"
                                  style={{ fontSize: 11 }}
                                >
                                  Good
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                className={classes.gridItem_slider}
                              >
                                <Slider
                                  classes={{
                                    track: classes.slider_track,
                                    rail: classes.slider_track,
                                    mark: classes.slider_mark,
                                    markActive: classes.slider_mark,
                                  }}
                                  value={option.score}
                                  min={0}
                                  max={100}
                                  step={1}
                                  marks={marks}
                                  onChange={(event, value) =>
                                    this.onChange(
                                      event,
                                      criteriaIndex,
                                      optionIndex,
                                      value
                                    )
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </Paper>
              </Grid>
            </Fade>
          ))}
        </Grid>
        {/*Empty Line for Buttons*/}
        <div className={classes.emptySpace} />
        {/*Info Dialogs*/}
        <InfoDialog
          title={"Rate Options"}
          text={LongStrings.OptionsRatingInfo}
          show={this.state.showInfo}
          hide={this.onHideInfo}
        />
      </div>
    );
  }
}

RateOptions.propTypes = {
  classes: PropTypes.object.isRequired,
  rateOptions: PropTypes.object.isRequired,
  getRatedOptions: PropTypes.func.isRequired,
  putRatedOption: PropTypes.func.isRequired,
  optionsAndCriteria: PropTypes.object.isRequired,
  weightCriteria: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  rateOptions: state.rateOptions,
  optionsAndCriteria: state.optionsAndCriteria,
  weightCriteria: state.weightCriteria,
});

export default connect(mapStateToProps, { getRatedOptions, putRatedOption })(
  withStyles(styles)(RateOptions)
);
