import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import update from "immutability-helper";
import WeightSlider_Scale from "../../../images/WeightSlider_Scale.svg";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import InfoDialog from "../../../components/InfoDialog";
import { connect } from "react-redux";
import {
  getWeightedCriteria,
  putWeightedCriteria,
} from "../../../services/actions/WeightCriteria_Action";
import * as LongStrings from "../../../services/LongTexts";
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
    left: theme.spacing(1.2),
  },

  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: "100%",
  },

  gridItem_criteria: {
    minWidth: theme.spacing(40),
    maxWidth: theme.spacing(50),
    display: "flex",
    alignItems: "center",
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

  gridItem_slider: {
    marginTop: -theme.spacing(1),
    marginBottom: -theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  emptySpace: {
    height: theme.spacing(4),
  },
});

const marks = [
  {
    value: -66.6,
  },
  {
    value: -33.3,
  },
  {
    value: 0,
  },
  {
    value: 33.3,
  },
  {
    value: 66.6,
  },
];

class WeightCriteria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weightedCriteria: [],
      weightInfo: [],
      value: 50,
      showInfo: false,
      dragging: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onHideInfo = this.onHideInfo.bind(this);
    this.onShowInfo = this.onShowInfo.bind(this);
  }

  //GET_CRITERIA
  componentDidMount() {
    this.props.getWeightedCriteria(this.props.decisionId);

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
      prevProps.weightCriteria.weightedCriteria !==
      this.props.weightCriteria.weightedCriteria
    ) {
      if (this.props.weightCriteria.weightedCriteria.length > 0) {
        this.setWeightedCriteria();
      }
    }
  }

  //CHANGE_CRITERIA
  onChange = (event, value, itemLocal, index) => {
    //send data to fetch
    const weightedCriteria = {
      id: itemLocal.id,
      weight: value,
    };

    onChange$.next(weightedCriteria);

    //Update State
    let weightInfoArray = this.state.weightInfo;

    let newState = update(this.state.weightedCriteria, {
      [index]: {
        weight: { $set: value },
      },
    });

    //Show InfoText
    weightInfoArray[index] = WeightCriteria.getWeightInfoText(itemLocal);

    this.setState({
      weightedCriteria: newState,
      weightInfo: weightInfoArray,
    });
  };

  fetchSliderValues(weightedCriteria) {
    this.props.putWeightedCriteria(this.props.decisionId, weightedCriteria);
  }

  onHideInfo() {
    this.setState({ showInfo: false });

    ReactGA.event({
      category: "Weight Criteria",
      action: "Hide Info",
    });
  }

  onShowInfo = () => {
    this.setState({ showInfo: true });

    ReactGA.event({
      category: "Weight Criteria",
      action: "Show Info",
    });
  };

  setWeightedCriteria() {
    let weightInfoArray = this.state.weightInfo;
    let selectionCriteria = this.props.optionsAndCriteria.selectionCriteria;
    let weightedCriteriaArray = [];

    this.props.weightCriteria.weightedCriteria.forEach(function (
      criteria,
      index
    ) {
      //find and set criterias
      let criteria1 = selectionCriteria.find(
        (obj) => obj.id === criteria.selectionCriteria1Id
      );

      let criteria2 = selectionCriteria.find(
        (obj) => obj.id === criteria.selectionCriteria2Id
      );

      //create weighted criteria
      const weightedCriteria = {
        id: criteria.id,
        weight: criteria.weight,
        selectionCriteria1: criteria1,
        selectionCriteria2: criteria2,
      };

      //get infoText
      weightInfoArray[index] = WeightCriteria.getWeightInfoText(
        weightedCriteria
      );

      //add object to array
      weightedCriteriaArray = [...weightedCriteriaArray, weightedCriteria];
    });

    //set state
    this.setState({
      weightedCriteria: weightedCriteriaArray,
    });
  }

  static getWeightInfoText(itemLocal) {
    switch (true) {
      case itemLocal.weight < -66:
        return `${itemLocal.selectionCriteria1.name} is way more important than ${itemLocal.selectionCriteria2.name}`;
      case itemLocal.weight < -33:
        return `${itemLocal.selectionCriteria1.name} is more important than ${itemLocal.selectionCriteria2.name}`;
      case itemLocal.weight < -5:
        return `${itemLocal.selectionCriteria1.name} is a little more important than ${itemLocal.selectionCriteria2.name}`;
      case itemLocal.weight < 5:
        return `${itemLocal.selectionCriteria1.name} is as important as ${itemLocal.selectionCriteria2.name}`;
      case itemLocal.weight < 33:
        return `${itemLocal.selectionCriteria2.name} is a little more important than ${itemLocal.selectionCriteria1.name}`;
      case itemLocal.weight < 66:
        return `${itemLocal.selectionCriteria2.name} is more important than ${itemLocal.selectionCriteria1.name}`;
      case itemLocal.weight <= 100:
        return `${itemLocal.selectionCriteria2.name} is way more important than ${itemLocal.selectionCriteria1.name}`;
      default:
        return "";
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.div_main}>
        <Grid container justify="center" alignContent="center" spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Weight Criteria
              <IconButton
                aria-label="Help"
                className={classes.infoButton}
                onClick={this.onShowInfo}
              >
                <InfoIcon color="secondary" />
              </IconButton>
            </Typography>
          </Grid>
          {this.state.weightedCriteria.map((criteria, index) => (
            <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }}>
              <Grid
                item
                xs={6}
                className={classes.gridItem_criteria}
                key={criteria.id}
              >
                <Paper elevation={2} className={classes.paper}>
                  <Grid container spacing={16} alignItems="center">
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {criteria.selectionCriteria1.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {criteria.selectionCriteria2.name}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      zeroMinWidth
                      className={classes.gridItem_slider}
                    >
                      <Slider
                        classes={{
                          track: classes.slider_track,
                          rail: classes.slider_track,
                          mark: classes.slider_mark,
                          markActive: classes.slider_mark,
                        }}
                        value={criteria.weight}
                        min={-100}
                        max={100}
                        step={1}
                        marks={marks}
                        onChange={(event, value) =>
                          this.onChange(event, value, criteria, index)
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption">
                        {this.state.weightInfo[index]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Fade>
          ))}
        </Grid>
        {/*Empty Line for Buttons*/}
        <div className={classes.pageBottomEmptySpace} />
        {/*Info Dialogs*/}
        <InfoDialog
          title={"Weight Criteria"}
          text={LongStrings.WeightCriteriaInfo}
          show={this.state.showInfo}
          hide={this.onHideInfo}
        />
      </div>
    );
  }
}

WeightCriteria.propTypes = {
  classes: PropTypes.object.isRequired,
  weightCriteria: PropTypes.object.isRequired,
  getWeightedCriteria: PropTypes.func.isRequired,
  putWeightedCriteria: PropTypes.func.isRequired,
  optionsAndCriteria: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  weightCriteria: state.weightCriteria,
  optionsAndCriteria: state.optionsAndCriteria,
});

export default connect(mapStateToProps, {
  getWeightedCriteria,
  putWeightedCriteria,
})(withStyles(styles)(WeightCriteria));
