import React, {useState } from "react";
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InfoDialog from "../../../components/InfoDialog";
import EditableList from "./components/EditableList";
import theme from "../../../muiTheme";
import {
	DecisionOptionInfo,
	SelectionCriteriaInfo,
} from "../../../services/LongTexts";
import {OptionsAndCriteriaKeys} from "../../../services/redux/OptionsAndCriteriaSlice";
import {useParams} from "react-router-dom";

const useStyles = makeStyles({
	divMain: {
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
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		marginBottom: theme.spacing(4),
	},

	emptySpace: {
		height: theme.spacing(4),
	},
});

const OptionsAndCriteria: React.FC = () => {

	const [showOptionsInfo, setShowOptionsInfo] = useState(false);
	const [showCriteriaInfo, setShowCriteriaInfo] = useState(false);

	const classes = useStyles();

	return (
		<div className={classes.divMain}>
			<Grid container justify="center" alignContent="center">
				<Grid item xs={6} className={classes.gridItem}>
					<Typography variant="h5" gutterBottom>
						Decision Options
						<IconButton
							aria-label="Help"
							className={classes.infoButton}
							onClick={():void => setShowOptionsInfo(true)}
						>
							<InfoIcon color="secondary" />
						</IconButton>
					</Typography>
					<EditableList
						itemsKey={OptionsAndCriteriaKeys.decisionOptions}
					/>
				</Grid>
				<Grid item xs={6} className={classes.gridItem}>
					<Typography variant="h5" gutterBottom>
						Selection Criteria
						<IconButton
							aria-label="Help"
							className={classes.infoButton}
							onClick={():void => setShowCriteriaInfo(true)}
						>
							<InfoIcon color="secondary" />
						</IconButton>
					</Typography>
					<EditableList
						itemsKey={OptionsAndCriteriaKeys.selectionCriteria}
					/>
				</Grid>
			</Grid>
			{/*Empty Space for Buttons*/}
			<div className={classes.emptySpace} />
			{/*Info Dialogs*/}
			<InfoDialog
				text={DecisionOptionInfo}
				show={showOptionsInfo}
				hide={():void => setShowOptionsInfo(false)}
			/>
			<InfoDialog
				text={SelectionCriteriaInfo}
				show={showCriteriaInfo}
				hide={():void => setShowCriteriaInfo(false)}
			/>
		</div>
	);
};

export default OptionsAndCriteria;
