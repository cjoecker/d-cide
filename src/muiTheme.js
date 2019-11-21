import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

    typography: {
        useNextVariants: true,
        fontFamily: [
            'Quicksand',
            'sans-serif',
        ].join(','),
        caption: {
            fontSize: 12,
            color: '#646464',
        },
        fontWeightLight: 3000,
        fontWeightRegular: 4000,
        fontWeightMedium: 5000
    },

    palette: {
        primary: {
            main: '#0f61a0',
            contrastText: '#fff',
        },
        secondary: {
            main: '#8f8f8f',
            contrastText: '#fff',
        },
    },

    // fontFamily: [
    //     'Quicksand',
    //     'sans-serif',
    // ].join(','),


});

export default theme;