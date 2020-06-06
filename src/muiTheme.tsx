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
		background = '#34393f';
		primary = '#10a4f9';
		primaryContrastText = '#303030';
		secondary = '#BFBFBF';
		secondaryContrastText = '#303030';
		primaryText = '#fcfcfc';
		secondaryText = '#BDBDBD';
		disabledText = '#BFBFBF';
	}

	function shadeHexColor(color: string, percent: number) {
		var f = parseInt(color.slice(1), 16),
			t = percent < 0 ? 0 : 255,
			p = percent < 0 ? percent * -1 : percent,
			R = f >> 16,
			G = (f >> 8) & 0x00ff,
			B = f & 0x0000ff;
		return (
			'#' +
			(
				0x1000000 +
				(Math.round((t - R) * p) + R) * 0x10000 +
				(Math.round((t - G) * p) + G) * 0x100 +
				(Math.round((t - B) * p) + B)
			)
				.toString(16)
				.slice(1)
		);
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
					background: `linear-gradient(145deg, ${primary}, ${shadeHexColor(primary, -0.4)})`,
					boxShadow: `6px 6px 12px rgba(0, 0, 0, 0.25), -6px -6px 12px rgba(180, 180, 180, 0.15);`,
					'&:hover': {
						background: `linear-gradient(145deg, ${shadeHexColor(primary, -0.15)}, ${shadeHexColor(primary, -0.45)})`,
					},
					'&:active': {
						background: primary,
						boxShadow: `inset 6px 6px 12px rgba(0, 0, 0, 0.5), inset -6px -6px 12px rgba(180, 180, 180, 0.4)`,
					},
				},
			},
			MuiCssBaseline: {
				'@global': {
					body: {
						background: `linear-gradient(145deg, ${background}, ${shadeHexColor(background, -0.57)})`,
					},
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
