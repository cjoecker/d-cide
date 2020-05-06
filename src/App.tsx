import React from 'react';
import './index.css';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import LinearProgress from '@material-ui/core/LinearProgress';
import {shallowEqual, useSelector} from 'react-redux';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import {Route, Switch} from 'react-router-dom';
import {RootState} from './redux/rootReducer';
import LandingPage from './components/LandingPage';
import Decision from './scenes/Decision/Decision';
import AlertsBanner from './components/AlertsBanner';
import theme from './muiTheme';
import dcideLogo from './images/d-cide_Logo.svg';
import {verifyToken} from './redux/actionsAndSlicers/SessionActions';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './scenes/NotFound/NotFound';

const {token} = localStorage;

verifyToken(token);

const useStyles = makeStyles({
	divMain: {
		flexGrow: 1,
		width: '100%',
		overflowX: 'hidden', //Avoid negative margin from mainGrid
	},

	appBar: {
		position: 'fixed',
		Top: 0,
		marginBottom: theme.spacing(2),
		height: theme.spacing(6),
		width: '100%',
		justifyContent: 'center',
		justifyItems: 'center',
	},

	linearProgress: {
		position: 'fixed',
		marginTop: theme.spacing(6),
		Top: 0,
		width: '100%',
	},

	divLogo: {
		height: '100%',
		overflow: 'hidden',
		float: 'left',
		marginLeft: theme.spacing(-1),
	},

	divRouter: {
		marginTop: theme.spacing(6),
	},
	logo: {
		width: theme.spacing(17),
		height: '100%',
	},
});

const App: React.FC = () => {
	const {isLoading} = useSelector((state: RootState) => state.App, shallowEqual);
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<div className={classes.divMain}>
				<AppBar position='static' color='primary' className={classes.appBar}>
					<Toolbar>
						<div className={classes.divLogo} data-testid='d-cideLogo'>
							<Link
								href='/'
								style={{
									textDecoration: 'none',
								}}
							>
								<CardMedia className={classes.logo} image={dcideLogo} title='d-cide' />
							</Link>
						</div>
					</Toolbar>
				</AppBar>

				<div className={classes.linearProgress}>{isLoading > 0 && <LinearProgress color='secondary' />}</div>
				<div className={classes.divRouter}>
					<Switch>
						<Route exact path='/' component={LandingPage} />
						<PrivateRoute exact path='/decisions/:decisionId' component={Decision} />
						<Route component={NotFound} />
					</Switch>
				</div>
				<AlertsBanner />
			</div>
		</ThemeProvider>
	);
};

export default App;

export type ParamTypes = {
	decisionId: string;
};
