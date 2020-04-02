import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import EditableList from "./components/EditableList";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import InfoDialog from "../../../components/InfoDialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import * as LongStrings from "../../../services/LongTexts";
import ReactGA from "react-ga";
import { deleteAlert, showAlert } from "../../../services/redux/Alerts_Actions";
import {
	NOT_ENOUGH_CRITERIA,
	NOT_ENOUGH_OPTIONS,
} from "../../../services/Alerts";

const styles = (theme) => ({
	div_main: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5.5),
		textAlign: "center",
	},

	infoButton: {
		bottom: theme.spacing(0.25),
		left: theme.spacing(1.2),
	},

	gridItem: {
		maxWidth: theme.spacing(62),
	},

	emptySpace: {
		height: theme.spacing(4),
	},
});

class OptionsAndCriteria extends Component {
	constructor(props) {
		super(props);

		this.state = {
			optionsInfo: false,
			criteriaInfo: false,
		};

		this.showInfo = this.showInfo.bind(this);
		this.hideInfo = this.hideInfo.bind(this);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (
			prevProps.optionsAndCriteria.decisionOptions !==
			this.props.optionsAndCriteria.decisionOptions
		) {
			this.props.optionsAndCriteria.decisionOptions.length < 2
				? this.props.showAlert(NOT_ENOUGH_OPTIONS)
				: this.props.deleteAlert(NOT_ENOUGH_OPTIONS);
		}

		if (
			prevProps.optionsAndCriteria.selectionCriteria !==
			this.props.optionsAndCriteria.selectionCriteria
		) {
			this.props.optionsAndCriteria.selectionCriteria.length < 2
				? this.props.showAlert(NOT_ENOUGH_CRITERIA)
				: this.props.deleteAlert(NOT_ENOUGH_CRITERIA);
		}
	}

	showInfo(e, name) {
		this.setState({ [name]: true });
		ReactGA.event({
			category: "Options And Criteria",
			action: "Show Info",
		});
	}

	hideInfo(e, name) {
		this.setState({ [name]: false });
		ReactGA.event({
			category: "Options And Criteria",
			action: "Hide Info",
		});
	}

	render() {
		const { classes } = this.props;
		const { isLoading } = this.props.app;

		const minItemsThere =
			!isLoading &&
			!(
				this.props.optionsAndCriteria.decisionOptions.length >= 2 &&
				this.props.optionsAndCriteria.selectionCriteria.length >= 2
			);

		return (
			<div className={classes.div_main} align="center">
				<Grid container justify="center" alignContent="center" spacing={40}>
					<Grid item xs={6} className={classes.gridItem}>
						<Typography variant="h5" gutterBottom>
							Decision Options
							<IconButton
								aria-label="Help"
								className={classes.infoButton}
								onClick={(e) => this.showInfo(e, "optionsInfo")}
							>
								<InfoIcon color="secondary" />
							</IconButton>
						</Typography>
						<EditableList
							itemsKey="decisionOptions"
							decisionId={this.props.decisionId}
						/>
					</Grid>
					<Grid item xs={6} className={classes.gridItem}>
						<Typography variant="h5" className={classes.titleText} gutterBottom>
							Selection Criteria
							<IconButton
								aria-label="Help"
								className={classes.infoButton}
								onClick={(e) => this.showInfo(e, "criteriaInfo")}
							>
								<InfoIcon color="secondary" />
							</IconButton>
						</Typography>
						<EditableList
							itemsKey="selectionCriteria"
							decisionId={this.props.decisionId}
						/>
					</Grid>
				</Grid>
				{/*Empty Space for Buttons*/}
				<div className={classes.emptySpace} />
				{/*Info Dialogs*/}
				<InfoDialog
					text={LongStrings.DecisionOptionInfo}
					show={this.state.optionsInfo}
					hide={(e) => this.hideInfo(e, "optionsInfo")}
				/>
				<InfoDialog
					text={LongStrings.SelectionCriteriaInfo}
					show={this.state.criteriaInfo}
					hide={(e) => this.hideInfo(e, "criteriaInfo")}
				/>
			</div>
		);
	}
}

OptionsAndCriteria.propTypes = {
	app: PropTypes.object.isRequired,
	optionsAndCriteria: PropTypes.object.isRequired,
	showAlert: PropTypes.func.isRequired,
	deleteAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	app: state.app,
	optionsAndCriteria: state.optionsAndCriteria,
});

export default connect(mapStateToProps, { showAlert, deleteAlert })(
	withStyles(styles)(OptionsAndCriteria)
);
