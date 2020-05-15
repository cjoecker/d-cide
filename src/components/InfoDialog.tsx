import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import ReactGA from 'react-ga';
import theme from '../muiTheme';

const useStyles = makeStyles({
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
};

const InfoDialog: React.FC<Props> = (props: Props) => {
	const {text, show, onClose} = props;

	const classes = useStyles();

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isMounted) {
			const dialogTitle = text.props.children.find((obj: {type: string}) => obj.type === 'h2').props.children;

			if (show)
				ReactGA.event({
					category: 'Info dialog',
					action: `Open dialog ${dialogTitle}`,
				});
			else
				ReactGA.event({
					category: 'Info dialog',
					action: `Close dialog ${dialogTitle}`,
				});
		}
	}, [show]);

	const handleClose = () => {
		onClose();
	};

	return (
		<div>
			<Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={show}>
				<DialogContent className={classes.dialogContent}>
					<Typography component='span' data-testid='infoText' variant='body1' className={classes.text}>
						{text}
					</Typography>
					<IconButton aria-label='Close' data-testid='infoCloseButton' className={classes.closeButton} onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default InfoDialog;
