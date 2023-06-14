import { createTheme } from '@mui/material';

export const basicTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#0e3766',
          contrastText: '#fff',
        },
        customYellow: {
          main: '#d3c019',
          contrastText: '#ff6e40',
        },
        divider: 'rgba(212,22,22,0.12)',
        basicBackground: "#0e3766"
      },
})