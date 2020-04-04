import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import theme from "../../muiTheme";

const useStyles = makeStyles({
	divMain: {
		textAlign: "center",
		marginTop: theme.spacing(2),
	},

	TitleTypography: {
		marginTop: theme.spacing(1),
	},

	gridContainer: {
		minWidth: theme.spacing(40),
		maxWidth: theme.spacing(63),
	},

	paper: {
		margin: theme.spacing(1),
	},

	TitleGridItem: {
		paddingTop: theme.spacing(4),
	},

	button: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
});

const NotFound: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();

	const handleClick = ():void => {
		history.push("/");
	};

	return (
		<div className={classes.divMain}>
			<Grid container justify="center">
				<Paper elevation={2} key="mainPaper" className={classes.paper}>
					<Grid
						container
						justify="center"
						alignItems="center"
						spacing={0}
						className={classes.gridContainer}
					>
						{/*Title*/}
						<Grid item xs={12} className={classes.TitleGridItem}>
							<Typography variant="h4" gutterBottom>
								Oops!
							</Typography>
							<Typography variant="body1" gutterBottom>
								Page not found...
							</Typography>
						</Grid>
						<Grid item xs={12} className={classes.button}>
							<Button variant="contained" color="primary" onClick={handleClick}>
								GO HOME
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</div>
	);
};

export default NotFound;
