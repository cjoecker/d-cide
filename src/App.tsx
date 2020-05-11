import React from 'react';
import './index.css';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Decision from './scenes/Decision/Decision';
import AlertsBanner from './components/AlertsBanner';
import theme from './muiTheme';
import imgDcideLogo from './images/d-cide_Logo.svg';

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
		Top: 0,
		marginBottom: theme.spacing(2),
		height: theme.spacing(6),
		width: '100%',
		justifyContent: 'center',
		justifyItems: 'center',
	},

	divLogoDcide: {
		height: '100%',
		marginLeft: theme.spacing(-1),
	},

	imgDcideLogo: {
		width: theme.spacing(17),
		height: '100%',
	},

	divRouter: {
		marginTop: theme.spacing(6),
	},

	footer: {
		marginTop: 'auto',
		marginBottom: theme.spacing(0.5),
	},
	footerLegalText: {
		marginTop: -theme.spacing(0.5),
	},
	link: {
		cursor: 'pointer',
	},
});
//TODO remove # from router path
const App: React.FC = () => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<div className={classes.divMain}>
				<AppBar position='static' color='primary' className={classes.appBar}>
					<Toolbar>
						<div className={classes.divLogoDcide} data-testid='d-cideLogo'>
							<Link
								href='/'
								style={{
									textDecoration: 'none',
								}}
							>
								<CardMedia className={classes.imgDcideLogo} image={imgDcideLogo} title='d-cide imgDcideLogo' />
							</Link>
						</div>
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
						<Grid style={{marginTop: theme.spacing(-0.5)}} item xs={12}>
							<Link href='/' className={classes.link} underline='always'>
								Privacy
							</Link>
							&nbsp;&nbsp;&nbsp;
							<Link href='/' className={classes.link} underline='always'>
								Imprint
							</Link>
						</Grid>
					</Typography>
				</Grid>
				<AlertsBanner />
			</div>
		</ThemeProvider>
	);
};

export default App;

export type ParamTypes = {
	decisionId: string;
};
