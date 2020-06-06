import React from 'react';
import {createMuiTheme, Theme} from '@material-ui/core/styles';

function theme(darkMode = false): Theme {
	//Light Theme
	let background = '#e6e6e6';
	let primary = '#0f61a0';
	let primaryContrastText = '#fafafa';
	let secondary = '#858585';
	let secondaryContrastText = '#fafafa';
	let primaryText = '#000000';
	let secondaryText = '#4A4A4A';
	let disabledText = '#858585';

	if (darkMode) {
		background = '#303030';
		primary = '#8AC6F4';
		primaryContrastText = '#303030';
		secondary = '#BFBFBF';
		secondaryContrastText = '#303030';
		primaryText = '#fcfcfc';
		secondaryText = '#BDBDBD';
		disabledText = '#BFBFBF';
	}

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
			MuiFab: {
				root: {
					background: 'linear-gradient(145deg, #1068ab, #063c65)',
					boxShadow: '8px 8px 12px #cfcfcf, -8px -8px 12px #fdfdfd',
				},
			},
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
				default: background,
			},
			primary: {
				main: primary,
				contrastText: primaryContrastText,
			},
			secondary: {
				main: secondary,
				contrastText: secondaryContrastText,
			},
			text: {
				primary: primaryText,
				secondary: secondaryText,
				disabled: disabledText,
			},
		},
	});
}

export default theme;
