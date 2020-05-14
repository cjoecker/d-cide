import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';
import {isMobile} from 'react-device-detect';
import theme from '../muiTheme';
import CookiesBannerText from '../constants/CookiesBannerText';

const useStyles = makeStyles({
	gridMobile: {
		position: 'fixed',
		height: '100%',
		outline: 'none',
	},

	gridDesktop: {
		position: 'fixed',
		bottom: 'env(safe-area-inset-bottom)',
		outline: 'none',
	},

	paper: {
		marginBottom: theme.spacing(4),
		maxWidth: '70%',
	},
	typographyGridItem: {
		margin: theme.spacing(0, 3, 0, 3),
	},
	button: {
		margin: theme.spacing(0, 3, 2, 0),
	},
});

const CookiesBanner: React.FC = () => {
	const [open, setOpen] = useState(true);

	const classes = useStyles();

	const handleClose = () => {
		ReactGA.event({
			category: 'Cookies dialog',
			action: `Close`,
		});

		setOpen(false);
	};

	//TODO adjust font size in MUI theme when this is answered in stack overflow
	//https://stackoverflow.com/questions/61803598/material-ui-typography-with-different-variants

	const Banner = (
		<Slide direction='up' in={open} mountOnEnter unmountOnExit>
			<Grid
				className={isMobile ? classes.gridMobile : classes.gridDesktop}
				container
				justify='center'
				alignContent='center'
			>
				<Paper className={classes.paper} elevation={7}>
					<Grid item className={classes.typographyGridItem} xs={12}>
						<Typography component="span" data-testid='cookiesBanner' align="justify">
							{CookiesBannerText}
						</Typography>
					</Grid>
					<Grid container xs={12} justify='flex-end'>
						<Button onClick={() => handleClose()} className={classes.button} variant='contained' color='primary'>
							Understood
						</Button>
					</Grid>
				</Paper>
			</Grid>
		</Slide>
	);

	if (isMobile) {
		return (
			<Modal open={open} onClose={handleClose}>
				{Banner}
			</Modal>
		);
	}
	return Banner;
};

export default CookiesBanner;
