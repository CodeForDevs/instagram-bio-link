import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme(
  {
    typography: {
      fontFamily: [
        'Manrope',
        'Arial',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  },
);

export default theme;