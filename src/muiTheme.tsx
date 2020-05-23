import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
		fontFamily: ['Quicksand', 'sans-serif'].join(','),
		caption: {
			fontWeight: 400,
			fontSize: 14,
			color: '#000000',
		},
		fontWeightRegular: 400,
		fontWeightBold: 500,
		h1: {
			fontWeight: 500,
		},
		h2: {
			fontWeight: 500,
		},
		h3: {
			fontWeight: 500,
		},
		h4: {
			fontWeight: 500,
		},
		h5: {
			fontWeight: 500,
		},
		h6: {
			fontWeight: 500,
		},
	},
	overrides: {
		MuiTypography: {
			root: {
				'& h1': {
					fontWeight: 500,
				},
				'& h2': {
					fontWeight: 500,
				},
				'& h3': {
					fontWeight: 500,
				},
				'& h4': {
					fontWeight: 500,
				},
				'& h5': {
					fontWeight: 500,
				},
				'& h6': {
					fontWeight: 500,
				},
			},
		},
	},

	palette: {
		primary: {
			main: '#0f61a0',
			contrastText: '#fafafa',
		},
		secondary: {
			main: '#878787',
			contrastText: '#fafafa',
		},
	},
});

export default theme;
