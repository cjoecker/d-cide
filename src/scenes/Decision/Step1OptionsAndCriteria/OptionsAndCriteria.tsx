import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {HelpOutlineRounded} from '@material-ui/icons';
import InfoDialog from '../../../components/InfoDialog';
import EditableList from './components/EditableList';

import {DecisionOptionInfo, SelectionCriteriaInfo} from '../../../constants/InfoDialogTexts';
import {OptionsAndCriteriaKeys} from '../../../services/redux/actionsAndSlicers/OptionsAndCriteriaSlice';
import {NOT_ENOUGH_CRITERIA, NOT_ENOUGH_OPTIONS} from '../../../constants/Alerts';
import ComponentsTooltip from '../../../components/ComponentsTooltip';

const useStyles = makeStyles(theme => ({
	divMain: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5.5),
		textAlign: 'center',
	},

	infoButton: {
		bottom: theme.spacing(0.25),
		left: theme.spacing(1.5),
	},

	gridItem: {
		maxWidth: theme.spacing(55),
		margin: theme.spacing(0, 3, 4, 3),
	},
}));

const OptionsAndCriteria: React.FC = () => {
	const [showOptionsInfo, setShowOptionsInfo] = useState(false);
	const [showCriteriaInfo, setShowCriteriaInfo] = useState(false);

	const classes = useStyles();

	return (
		<div className={classes.divMain}>
			<Grid container justify='center' alignContent='center'>
				<Grid item xs={6} className={classes.gridItem}>
					<Typography component='span' variant='h1'>
						Decision Options
						<ComponentsTooltip title='Show help'>
							<IconButton
								aria-label='Show decision options help'
								data-testid={`${OptionsAndCriteriaKeys.decisionOptions}InfoButton`}
								className={classes.infoButton}
								onClick={() => setShowOptionsInfo(true)}
							>
								<HelpOutlineRounded />
							</IconButton>
						</ComponentsTooltip>
					</Typography>

					<EditableList itemsKey={OptionsAndCriteriaKeys.decisionOptions} notEnoughItemsAlert={NOT_ENOUGH_OPTIONS} />
				</Grid>
				<Grid item xs={6} className={classes.gridItem}>
					<Typography component='span' variant='h1'>
						Selection Criteria
						<ComponentsTooltip title='Show help'>
							<IconButton
								data-testid={`${OptionsAndCriteriaKeys.selectionCriteria}InfoButton`}
								className={classes.infoButton}
								onClick={() => setShowCriteriaInfo(true)}
							>
								<HelpOutlineRounded />
							</IconButton>
						</ComponentsTooltip>
					</Typography>
					<EditableList itemsKey={OptionsAndCriteriaKeys.selectionCriteria} notEnoughItemsAlert={NOT_ENOUGH_CRITERIA} />
				</Grid>
			</Grid>
			<InfoDialog text={DecisionOptionInfo} show={showOptionsInfo} onClose={() => setShowOptionsInfo(false)} />
			<InfoDialog text={SelectionCriteriaInfo} show={showCriteriaInfo} onClose={() => setShowCriteriaInfo(false)} />
		</div>
	);
};

export default OptionsAndCriteria;
