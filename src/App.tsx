import React, {useState} from 'react';
import './index.css';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReactGA, {ga} from 'react-ga';
import {Button, Link} from '@material-ui/core';
import Decision from './scenes/Decision/Decision';
import AlertsBanner from './components/AlertsBanner';
import theme from './muiTheme';
import imgDcideLogo from './images/d-cide_Logo.svg';
import CookiesBanner from './components/CookiesBanner';
import InfoDialog from './components/InfoDialog';
import {PrivacyPolicy} from './constants/PrivacyTexts';

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
	linkButton: {
		textTransform: 'none',
		textDecoration: 'underline',
		marginTop: theme.spacing(-0.5),
		fontWeight: 'normal',
	},
});

const App: React.FC = () => {
	const classes = useStyles();

	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

	if (process.env.REACT_APP_googleAnalyticsKey != null) ReactGA.initialize(process.env.REACT_APP_googleAnalyticsKey);

	ReactGA.pageview(window.location.pathname + window.location.search);
	ga('set', 'appVersion', process.env.REACT_APP_VERSION);

	if (window.matchMedia('(display-mode: standalone)').matches) {
		ReactGA.event({
			category: 'App Mode',
			action: 'Progressive Web App',
		});
	} else {
		ReactGA.event({
			category: 'App Mode',
			action: 'Web App',
		});
	}

	return (
		<ThemeProvider theme={theme}>
			<main role='main'>
				<div className={classes.divMain}>
					<AppBar position='static' color='primary' className={classes.appBar}>
						<Toolbar>
							<img className={classes.imgDcideLogo} src={imgDcideLogo} alt='d-cide logo' />
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
								&nbsp; by
{' '}
								<Link
									data-testid='cjoeckerLink'
									href='https://www.cjoecker.de/'
									onClick={() =>
										ReactGA.event({
											category: 'Redirect',
											action: 'Redirect to cjoecker.de',
										})
									}
									rel='noopener noreferrer'
									underline='always'
									target='_blank'
									tabIndex={localStorage.getItem('cookieConsentAccepted') == null ? -1 : 0}
									aria-label={"Christian Jöcker's(opens personal website in a new window)"}
								>
									Christian Jöcker
								</Link>
							</Grid>
							<Grid item xs={12}>
								<Button
									className={classes.linkButton}
									data-testid='privacyPolicyLink'
									onClick={() => setShowPrivacyPolicy(true)}
									color='primary'
								>
									Privacy Policy
								</Button>
							</Grid>
						</Typography>
					</Grid>
					<AlertsBanner />
					<CookiesBanner />
					<InfoDialog fullWidth text={PrivacyPolicy} show={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} />
				</div>
			</main>
		</ThemeProvider>
	);
};

export default App;
