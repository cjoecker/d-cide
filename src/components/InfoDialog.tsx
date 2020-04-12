import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import PropTypes from "prop-types";

const styles = (theme) => ({
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
	text: {
		textAlign: "justify",
	},
});
//TODO align close button
class InfoDialog extends React.Component {
	handleClose = () => {
		this.props.hide(false);
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Dialog
					onClose={this.handleClose}
					aria-labelledby="customized-dialog-title"
					open={this.props.show}
				>
					<DialogContent>
						<Typography
							component={"span"}
							variant="body2"
							className={classes.text}
						>
							{this.props.text}
						</Typography>
						<IconButton
							aria-label="Close"
							className={classes.closeButton}
							onClick={this.handleClose}
						>
							<CloseIcon />
						</IconButton>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

InfoDialog.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoDialog);
