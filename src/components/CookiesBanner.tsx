import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import {isMobile} from 'react-device-detect';
import {Dialog} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {PrivacyText} from '../constants/PrivacyTexts';
import theme from '../muiTheme';

const useStyles = makeStyles({
	gridMobile: {
		outline: 'none',
	},

	gridDesktop: {
		position: 'fixed',
		bottom: 'env(safe-area-inset-bottom)',
		outline: 'none',
		marginBottom: theme.spacing(3.5),
	},

	paper: {
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
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('cookieConsentAccepted') == null) setOpen(true);
	}, []);

	const classes = useStyles();

	const handleClose = () => {
		ReactGA.event({
			category: 'Cookies dialog',
			action: `Close`,
		});

		setOpen(false);

		localStorage.setItem('cookieConsentAccepted', 'true');
	};

	const desktopBanner = (
		<Slide direction='up' in={open} mountOnEnter unmountOnExit>
			<Grid className={classes.gridDesktop} container justify='center' alignContent='center'>
				<Paper className={classes.paper} elevation={7}>
					<Grid item className={classes.typographyGridItem} xs={12}>
						<Typography component='span' data-testid='cookiesBanner' align='justify'>
							{PrivacyText}
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

	const mobileDialog = (
		<Dialog open={open} onClose={handleClose}>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>{PrivacyText}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button className={classes.button} onClick={handleClose} variant='contained' color='primary'>
					Understood
				</Button>
			</DialogActions>
		</Dialog>
	);

	if (isMobile) {
		return mobileDialog;
	}
	return desktopBanner;
};

export default CookiesBanner;
