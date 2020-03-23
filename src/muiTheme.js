import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(","),
    caption: {
      fontSize: 12,
      color: "#272727",
    },
    fontWeightLight: 3000,
    fontWeightRegular: 4000,
    fontWeightMedium: 5000,
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
