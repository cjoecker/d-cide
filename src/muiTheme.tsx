import React from 'react';
import {createMuiTheme, Theme} from '@material-ui/core/styles';

function theme(darkMode = false): Theme {
	return createMuiTheme({
		typography: {
			fontFamily: ['Quicksand', 'Calibri', 'sans-serif'].join(','),
			caption: {
				fontWeight: 400,
				fontSize: 14,
			},
			fontWeightRegular: 400,
			fontWeightBold: 600,
			h1: {
				fontWeight: 600,
				fontSize: 28,
			},
			h2: {
				fontWeight: 600,
				fontSize: 23,
			},
			h3: {
				fontWeight: 600,
				fontSize: 20,
			},
			h4: {
				fontWeight: 600,
				fontSize: 18,
			},
			h5: {
				fontWeight: 600,
				fontSize: 18,
			},
			h6: {
				fontWeight: 600,
				fontSize: 16,
			},
			body1: {
				fontWeight: 500,
				fontSize: 16,
			},
			body2: {
				fontWeight: 500,
				fontSize: 16,
			},
		},
		overrides: {
			MuiTypography: {
				root: {
					'& h1': {
						fontWeight: 600,
						fontSize: 28,
					},
					'& h2': {
						fontWeight: 600,
						fontSize: 23,
						marginTop: 50,
					},
					'& h3': {
						fontWeight: 600,
						fontSize: 20,
						marginBottom: -4,
						marginTop: 30,
					},
					'& h4': {
						fontWeight: 600,
						fontSize: 18,
						marginTop: 20,
					},
					'& h5': {
						fontWeight: 600,
						fontSize: 18,
					},
					'& h6': {
						fontWeight: 600,
						fontSize: 16,
					},
					'& body': {
						fontWeight: 500,
						fontSize: 16,
					},
				},
			},
		},

		palette: {
			type: darkMode ? 'dark' : 'light',
			background: {
				default: darkMode ? '#303030' : '#e6e6e6',
			},
			primary: {
				main: darkMode ? '#8AC6F4' : '#0f61a0',
				contrastText: darkMode ? '#303030' : '#fafafa',
			},
			secondary: {
				main: darkMode ? '#BFBFBF' : '#858585',
				contrastText: darkMode ? '#303030' : '#fafafa',
			},
			text: {
				secondary: darkMode ? '#BDBDBD' : '#4A4A4A',
				disabled: darkMode ? '#BFBFBF' : '#858585',
			},
		},
	});
}

export default theme;
