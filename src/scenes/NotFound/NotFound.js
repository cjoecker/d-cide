import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { postSession } from "../../services/actions/Sessions_Action";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ReactGA from "react-ga";

const styles = (theme) => ({
  div_main: {
    textAlign: "center",
    textJustify: "center",
    marginTop: theme.spacing(8),
  },

  typography_title: {
    marginTop: theme.spacing(1),
  },

  gridContainer: {
    minWidth: theme.spacing(40),
    maxWidth: theme.spacing(63),
  },

  paper: {
    margin: theme.spacing(1),
  },

  gridItem_title: {
    paddingTop: theme.spacing(4),
  },

  button: {
    textJustify: "bottom",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
});

class NotFound extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit() {
    ReactGA.event({
      category: "Not Found",
      action: "Go Home",
    });

    this.props.history.push("/");
  }

  componentDidMount() {
    ReactGA.event({
      category: "Not Found",
      action: "Landed in not Found",
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.div_main}>
        <Grid container justify="center">
          <Paper elevation={2} key="mainPaper" className={classes.paper}>
            <Grid
              container
              justify="center"
              alignItems="center"
              spacing={0}
              className={classes.gridContainer}
            >
              {/*Title*/}
              <Grid item xs={12} className={classes.gridItem_title}>
                <Typography variant="h4" gutterBottom>
                  Oops!
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Page not found...
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  GO HOME
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
  postSession: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  security: state.security,
});

export default connect(mapStateToProps, { postSession })(
  withStyles(styles)(NotFound)
);
