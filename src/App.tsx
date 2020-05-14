import React from 'react';
import './index.css';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReactGA from 'react-ga';
import Decision from './scenes/Decision/Decision';
import AlertsBanner from './components/AlertsBanner';
import theme from './muiTheme';
import imgDcideLogo from './images/d-cide_Logo.svg';
import CookiesBanner from './components/CookiesBanner';

const useStyles = makeStyles({
	divMain: {
		flexGrow: 1,
		width: '100%',
		overflowX: 'hidden', //Avoid negative margin from mainGrid
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},

	appBar: {
		position: 'fixed',
		Top: 'env(safe-area-inset-top)',
		marginBottom: theme.spacing(2),
		height: theme.spacing(6),
		justifyContent: 'center',
		justifyItems: 'center',
		paddingLeft: 'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)',
	},

	imgDcideLogo: {
		maxWidth: theme.spacing(17),
		marginLeft: theme.spacing(-1),
	},

	divRouter: {
		marginTop: theme.spacing(6),
	},

	footer: {
		marginTop: 'auto',
		marginBottom: theme.spacing(0.5),
		paddingBottom: 'env(safe-area-inset-bottom)',
	},
	footerLegalText: {
		marginTop: -theme.spacing(0.5),
	},
	link: {
		cursor: 'pointer',
	},
});

const App: React.FC = () => {
	const classes = useStyles();

	ReactGA.initialize('***REMOVED***');
	ReactGA.pageview(window.location.pathname + window.location.search);
	//TODO add Google Analytics to links
	// Add links to cj name
	return (
		<ThemeProvider theme={theme}>
			<div className={classes.divMain}>
				<AppBar position='static' color='primary' className={classes.appBar}>
					<Toolbar>
						<img className={classes.imgDcideLogo} src={imgDcideLogo} alt='d-cide imgDcideLogo' />
					</Toolbar>
				</AppBar>

				<div className={classes.divRouter}>
					<Decision />
				</div>
				<Grid className={classes.footer} container justify='center' alignContent='center'>
					<Typography component='span' variant='caption' align='center'>
						<Grid item xs={12}>
							Made with &nbsp;
							<span role='img' aria-label='love'>
								💖
							</span>
							&nbsp; by Christian Jöcker
						</Grid>
					</Typography>
				</Grid>
				<AlertsBanner />
				<CookiesBanner />
			</div>
		</ThemeProvider>
	);
};

export default App;
