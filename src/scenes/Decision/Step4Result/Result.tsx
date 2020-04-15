import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import * as LongStrings from "../../../services/LongTexts";
import theme from "../../../muiTheme";
import { OptionsAndCriteriaKeys } from "../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice";
import ResultsChart from "./components/ResultsChart";

const useStyles = makeStyles({
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
});

type Props = {
	hidden: boolean;
};
//TODO check responsiveness for iphone
const Results: React.FC<Props> = (props: Props) => {
	const { hidden } = props;
	const classes = useStyles();

	return (
		<div className={classes.divMain}>
			<Grid container justify="center" alignContent="center">
				<Grid className={classes.gridItem} key="1" item xs={12}>
					<ResultsChart
						itemsKey={OptionsAndCriteriaKeys.decisionOptions}
						YKey="name"
						hidden={hidden}
						title="Decision Options Ranking"
						infoText={LongStrings.OptionsResultInfo}
					/>
				</Grid>
				<Grid className={classes.gridItem} key="2" item xs={12}>
					<ResultsChart
						itemsKey={OptionsAndCriteriaKeys.selectionCriteria}
						YKey="name"
						hidden={hidden}
						title="Selection Criteria Ranking"
						infoText={LongStrings.CriteriaResultInfo}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Results;
