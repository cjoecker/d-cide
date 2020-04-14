import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import theme from "../muiTheme";
import { Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";

const useStyles = makeStyles({
	secondaryButton: {
		marginRight: theme.spacing(1),
	},
});

interface Props {
	show: boolean;
	title: string;
	message: string;
	primaryButtonText: string;
	secondaryButtonText: string;
	onClickPrimary: () => void;
	onClickSecondary: () => void;
}

const TwoButtonsDialog: React.FC<Props> = (props: Props) => {
	const {
		show,
		title,
		message,
		primaryButtonText,
		secondaryButtonText,
		onClickPrimary,
		onClickSecondary,
	} = props;
	const classes = useStyles();

	return (
		<div>
			<Dialog
				open={show}
				TransitionComponent={Transition}
				disableBackdropClick
				disableEscapeKeyDown
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={onClickSecondary}
						variant="outlined"
						color="secondary"
						className={classes.secondaryButton}
					>
						{secondaryButtonText}
					</Button>
					<Button variant="contained" color="primary" onClick={onClickPrimary}>
						{primaryButtonText}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default TwoButtonsDialog;

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});
