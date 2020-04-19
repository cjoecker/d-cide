import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	typography: {
		fontFamily: ['Quicksand', 'sans-serif'].join(','),
		caption: {
			fontWeight: 500,
			fontSize: 14,
			color: '#000000',
		},
		fontWeightRegular: 500,
		fontWeightBold: 600,
		h1: {
			fontWeight: 600,
		},
		h2: {
			fontWeight: 600,
		},
		h3: {
			fontWeight: 600,
		},
		h4: {
			fontWeight: 600,
		},
		h5: {
			fontWeight: 600,
		},
		h6: {
			fontWeight: 600,
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
