import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InfoDialog from "../../../components/InfoDialog";
import EditableList from "./components/EditableList";
import theme from "../../../muiTheme";
import { DecisionOptionInfo, SelectionCriteriaInfo } from "../../../constants/InfoDialogTexts";
import { OptionsAndCriteriaKeys } from "../../../redux/actionsAndSlicers/OptionsAndCriteriaSlice";
import { NOT_ENOUGH_CRITERIA, NOT_ENOUGH_OPTIONS } from "../../../constants/Alerts";

const useStyles = makeStyles({
	divMain: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5.5),
		textAlign: 'center',
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

type Props = {
	hidden: boolean;
};

const OptionsAndCriteria: React.FC<Props> = (props: Props) => {
	const [showOptionsInfo, setShowOptionsInfo] = useState(false);
	const [showCriteriaInfo, setShowCriteriaInfo] = useState(false);

	const {hidden} = props;
	const classes = useStyles();

	return (
		<div className={classes.divMain}>
			<Grid container justify='center' alignContent='center'>
				<Grid item xs={6} className={classes.gridItem}>
					<Typography variant='h5' gutterBottom>
						Decision Options
						<IconButton
							aria-label='Help'
							data-testid={`${OptionsAndCriteriaKeys.decisionOptions}InfoButton`}
							className={classes.infoButton}
							onClick={() => setShowOptionsInfo(true)}
						>
							<InfoIcon color='secondary' />
						</IconButton>
					</Typography>
					<EditableList
						itemsKey={OptionsAndCriteriaKeys.decisionOptions}
						notEnoughItemsAlert={NOT_ENOUGH_OPTIONS}
						hidden={hidden}
					/>
				</Grid>
				<Grid item xs={6} className={classes.gridItem}>
					<Typography variant='h5' gutterBottom>
						Selection Criteria
						<IconButton
							aria-label='Help'
							data-testid={`${OptionsAndCriteriaKeys.selectionCriteria}InfoButton`}
							className={classes.infoButton}
							onClick={() => setShowCriteriaInfo(true)}
						>
							<InfoIcon color='secondary' />
						</IconButton>
					</Typography>
					<EditableList
						data-testid='selectionCriteriaList'
						itemsKey={OptionsAndCriteriaKeys.selectionCriteria}
						notEnoughItemsAlert={NOT_ENOUGH_CRITERIA}
						hidden={hidden}
					/>
				</Grid>
			</Grid>
			<div className={classes.emptySpace} />
			<InfoDialog text={DecisionOptionInfo} show={showOptionsInfo} onClose={() => setShowOptionsInfo(false)} />
			<InfoDialog text={SelectionCriteriaInfo} show={showCriteriaInfo} onClose={() => setShowCriteriaInfo(false)} />
		</div>
	);
};

export default OptionsAndCriteria;
