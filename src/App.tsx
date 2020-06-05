import React, {useEffect, useState} from 'react';
import './index.css';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReactGA, {ga} from 'react-ga';
import {Button, IconButton, Link} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Brightness4Rounded, Brightness5Rounded} from '@material-ui/icons';
import Decision from './scenes/Decision/Decision';
import AlertsBanner from './components/AlertsBanner';
import {ReactComponent as Logo} from './images/d-cide_Logo.svg';
import CookiesBanner from './components/CookiesBanner';
import InfoDialog from './components/InfoDialog';
import {PrivacyPolicy} from './constants/PrivacyTexts';
import theme from './muiTheme';
import ComponentsTooltip from './components/ComponentsTooltip';

const useStyles = makeStyles(styleTheme => ({
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
		marginBottom: styleTheme.spacing(2),
		height: styleTheme.spacing(6),
		justifyContent: 'center',
		justifyItems: 'center',
		paddingLeft: 'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)',
	},

	logoBox: {
		maxWidth: styleTheme.spacing(17),
		marginLeft: styleTheme.spacing(-1),
		height: '50%',
	},

	darkModeIcon: {
		marginRight: styleTheme.spacing(-2),
	},

	divRouter: {
		marginTop: styleTheme.spacing(6),
	},

	footer: {
		marginTop: 'auto',
		marginBottom: styleTheme.spacing(0.5),
		paddingBottom: 'env(safe-area-inset-bottom)',
	},
	linkButton: {
		textTransform: 'none',
		textDecoration: 'underline',
		marginTop: styleTheme.spacing(-0.5),
		fontWeight: 'normal',
	},
}));

const App: React.FC = () => {
	const classes = useStyles();

	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
	const [darkModeActive, setDarkModeActive] = useState(false);

	useEffect(() => {
		defineDarkMode();

		logAppVersion();

		initializeGoogleAnalytics();
	}, []);

	useEffect(() => {
		if (darkModeActive) localStorage.setItem('darkModeActive', 'true');
		else localStorage.setItem('darkModeActive', 'false');
	}, [darkModeActive]);

	const defineDarkMode = () => {
		if (localStorage.getItem('darkModeActive') == null) {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				setDarkModeActive(true);
				localStorage.setItem('darkModeActive', 'true');
			} else {
				setDarkModeActive(false);
				localStorage.setItem('darkModeActive', 'false');
			}
		} else if (localStorage.getItem('darkModeActive') === 'true') setDarkModeActive(true);
	};

	const initializeGoogleAnalytics = () => {
		if (process.env.REACT_APP_googleAnalyticsKey != null) ReactGA.initialize(process.env.REACT_APP_googleAnalyticsKey);

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
	};

	const logAppVersion = () => {
		ReactGA.pageview(window.location.pathname + window.location.search);
		ga('set', 'appVersion', process.env.REACT_APP_VERSION);

		console.log(`${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`);
	};

	const onClickDarkMode = () => {
		ReactGA.event({
			category: 'Change dark mode',
			action: (!darkModeActive).toString(),
		});

		setDarkModeActive(darkMode => !darkMode);
	};

	const appTheme = React.useMemo(() => theme(darkModeActive), [darkModeActive]);

	return (
		<ThemeProvider theme={appTheme}>
			<CssBaseline />
			<main role='main'>
				<div className={classes.divMain}>
					<AppBar position='static' color='primary' className={classes.appBar}>
						<Toolbar>
							<Logo className={classes.logoBox} fill={appTheme.palette.secondary.contrastText} />
							<div style={{flexGrow: 1}} />
							<ComponentsTooltip>
								<IconButton
									aria-label={darkModeActive ? 'Set light theme' : 'Set dark theme'}
									color='inherit'
									className={classes.darkModeIcon}
									onClick={onClickDarkMode}
								>
									{darkModeActive ? <Brightness5Rounded /> : <Brightness4Rounded />}
								</IconButton>
							</ComponentsTooltip>
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
