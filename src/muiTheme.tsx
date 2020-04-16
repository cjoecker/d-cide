import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	typography: {
		fontFamily: ["Quicksand", "sans-serif"].join(","),
		caption: {
			fontSize: 12,
			color: "#272727",
		},
		fontWeightRegular: 500,
		h5: {
			fontWeight: 600,
		}


	},

	palette: {
		primary: {
			main: "#0f61a0",
			contrastText: "#fafafa",
		},
		secondary: {
			main: "#878787",
			contrastText: "#fafafa",
		},
	},
});

export default theme;
