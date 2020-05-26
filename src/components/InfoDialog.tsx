import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog, {DialogProps} from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import ReactGA from 'react-ga';
import theme from '../muiTheme';
import ButtonsTooltip from './ButtonsTooltip';

const useStyles = makeStyles({
	dialog: {
		margin: 0,
	},

	dialogContent: {
		marginTop: theme.spacing(-2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(2),
		top: theme.spacing(1),
		backgroundColor: 'white',
	},
	text: {
		textAlign: 'justify',
	},
});

type Props = {
	text: JSX.Element;
	show: boolean;
	onClose: () => void;
	fullWidth?: boolean;
};

const InfoDialog: React.FC<Props> = (props: Props) => {
	const {text, show, onClose, fullWidth} = props;

	const classes = useStyles();

	const [isMounted, setIsMounted] = useState(false);
	const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isMounted) {
			const dialogTitle = text.props.children.find((obj: {type: string}) => obj.type === 'h1').props.children;

			if (show) {
				if (fullWidth != null) {
					setMaxWidth('lg');
				}

				ReactGA.event({
					category: 'Info dialog',
					action: `Open ${dialogTitle} dialog`,
				});
			} else
				ReactGA.event({
					category: 'Info dialog',
					action: `Close ${dialogTitle} dialog`,
				});
		}
	}, [show]);

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
				open={show}
			>
				<DialogContent className={classes.dialogContent}>
					<Typography component='span' data-testid='infoText' variant='body1' className={classes.text}>
						{text}
					</Typography>
					<ButtonsTooltip>
						<IconButton
							aria-label='Close'
							data-testid='infoCloseButton'
							className={classes.closeButton}
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					</ButtonsTooltip>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default InfoDialog;
