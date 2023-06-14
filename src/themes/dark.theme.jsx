import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#212121',
          contrastText: '#eee',
        },
        secondary: {
          main: '#4e342e',
          contrastText: '#ff6e40',
        },
        divider: 'rgba(212,22,22,0.12)',
        background: {
          paper: '#616161'
        },
        basicBackground: "#6f6f6f"
      },
})