import Dialog, {DialogProps} from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, {useEffect, useState} from 'react';
import ReactGA from 'react-ga';

import {useEffectUnsafe} from '../services/unsafeHooks';

import ComponentsTooltip from './ComponentsTooltip';

const useStyles = makeStyles(theme => ({
	dialog: {
		margin: 0,
	},

	dialogContent: {
		marginTop: theme.spacing(-2),
	},
	closeButton: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(-1),
		float: 'right',
	},
	text: {
		textAlign: 'justify',
	},
}));

type Props = {
	text: JSX.Element;
	isVisible: boolean;
	onClose: () => void;
	hasFullWidth?: boolean;
};

const InfoDialog: React.FC<Props> = (props: Props) => {
	const {text, isVisible, onClose, hasFullWidth} = props;

	const classes = useStyles();

	const [isMounted, setIsMounted] = useState(false);
	const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffectUnsafe(() => {
		if (isMounted) {
			const dialogTitle = text.props.children.find((obj: {type: string}) => obj.type === 'h1').props.children;

			if (isVisible) {
				if (hasFullWidth != null) {
					setMaxWidth('lg');
				}

				ReactGA.event({
					category: 'Info dialog',
					action: `Open ${dialogTitle} dialog`,
				});
			} else
				{ReactGA.event({
					category: 'Info dialog',
					action: `Close ${dialogTitle} dialog`,
				});}
		}
	}, [isVisible]);

	const handleClose = () => {
		onClose();
	};

	return (
		<div>
			<Dialog
				fullWidth={maxWidth !== false}
				maxWidth={maxWidth}
				className={classes.dialog}
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={isVisible}
			>
				<DialogContent className={classes.dialogContent}>
					<ComponentsTooltip>
						<IconButton
							aria-label='Close'
							data-testid='infoCloseButton'
							className={classes.closeButton}
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					</ComponentsTooltip>
					<Typography data-testid='infoText' component='span' variant='body1' align='left' className={classes.text}>
						{text}
					</Typography>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default InfoDialog;
