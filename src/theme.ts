import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', 
    },
    background: {
      default: '#f7f1e1', 
      paper: '#f7f1e1', 
    },
    text: {
      primary: '#000000', 
    },
  },
  components: {
    
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', 
        },
      },
    },
  },
});


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', 
    },
    background: {
      default: '#121212', 
      paper: '#1d1d1d', 
    },
    text: {
      primary: '#ffffff', 
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#333333', 
        },
      },
    },
  },
});
