import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import theme from "../muiTheme";

const useStyles = makeStyles({
	dialogContent: {
		marginTop: -theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
	text: {
		paddingTop: theme.spacing(30),
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

	const handleClose = () => {
		onClose();
	};

	return (
		<div>
			<Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={show}>
				<DialogContent className={classes.dialogContent}>
					<Typography component={'span'} variant='body2' className={classes.text}>
						{text}
					</Typography>
					<IconButton aria-label='Close' className={classes.closeButton} onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default InfoDialog;
