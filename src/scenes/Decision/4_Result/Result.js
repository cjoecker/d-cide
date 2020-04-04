import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ResultsChart from "./components/ResultsChart";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import InfoDialog from "../../../components/InfoDialog";
import Typography from "@material-ui/core/Typography";
import * as LongStrings from "../../../services/LongTexts";
import ReactGA from "react-ga";
import { connect } from "react-redux";
import Zoom from "@material-ui/core/Zoom";

const styles = (theme) => ({
	divMain: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5.5),
		textAlign: "center",
	},

	gridItem: {
		maxWidth: theme.spacing(75),
		minWidth: theme.spacing(38),
		margin: theme.spacing(2),
	},

	infoButton: {
		bottom: theme.spacing(0.25),
		left: theme.spacing(1.2),
	},

	gridItem_title: {
		margin: theme.spacing(1),
		paddingTop: theme.spacing(1),
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
		this.setState({ [name]: false });

		ReactGA.event({
			category: "Result",
			action: "Hide Info from " + name,
		});
	}

	showInfo(e, name) {
		this.setState({ [name]: true });

		ReactGA.event({
			category: "Result",
			action: "Show Info from " + name,
		});
	}

	render() {
		const { classes } = this.props;
		const decisionOptions = this.props.optionsAndCriteria["decisionOptions"];
		const selectionCriteria = this.props.optionsAndCriteria[
			"selectionCriteria"
		];

		return (
			<div className={classes.div_main}>
				<Grid container justify="center" alignContent="center" spacing={24}>
					<Grid className={classes.gridItem} key="1" item xs={12}>
						<Zoom
							in={decisionOptions}
							style={{
								transitionDelay: decisionOptions ? "200ms" : "0ms",
							}}
						>
							<Paper className={classes.paper} elevation={2} key={"Option"}>
								<Typography
									variant="h5"
									className={classes.gridItem_title}
									gutterBottom
								>
									Decision Options Ranking
									<IconButton
										aria-label="Help"
										className={classes.infoButton}
										onClick={(e) => this.showInfo(e, "optionsInfo")}
									>
										<InfoIcon color="secondary" />
									</IconButton>
								</Typography>

								<ResultsChart
									itemsKey={"decisionOptions"}
									decisionId={this.props.decisionId}
									YKey={"name"}
								/>
							</Paper>
						</Zoom>
					</Grid>
					<Grid className={classes.gridItem} key="2" item xs={12}>
						<Zoom
							in={selectionCriteria}
							style={{
								transitionDelay: decisionOptions ? "500ms" : "0ms",
							}}
						>
							<Paper className={classes.paper} elevation={2} key={"Criteria"}>
								<Typography
									variant="h5"
									className={classes.gridItem_title}
									gutterBottom
								>
									Selection Criteria Ranking
									<IconButton
										aria-label="Help"
										className={classes.infoButton}
										onClick={(e) => this.showInfo(e, "criteriaInfo")}
									>
										<InfoIcon color="secondary" />
									</IconButton>
								</Typography>

								<ResultsChart
									itemsKey={"selectionCriteria"}
									decisionId={this.props.decisionId}
									YKey={"name"}
								/>
							</Paper>
						</Zoom>
					</Grid>
				</Grid>
				{/*Info Dialogs*/}
				<InfoDialog
					title={"Decision Options Ranking"}
					text={LongStrings.OptionsResultInfo}
					show={this.state.optionsInfo}
					hide={(e) => this.hideInfo(e, "optionsInfo")}
				/>
				<InfoDialog
					title={"Selection Criteria Ranking"}
					text={LongStrings.CriteriaResultInfo}
					show={this.state.criteriaInfo}
					hide={(e) => this.hideInfo(e, "criteriaInfo")}
				/>
			</div>
		);
	}
}

Result.propTypes = {
	classes: PropTypes.object.isRequired,
	app: PropTypes.object.isRequired,
	optionsAndCriteria: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	app: state.app,
	optionsAndCriteria: state.optionsAndCriteria,
});

export default connect(mapStateToProps, {})(withStyles(styles)(Result));
