import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f9b174', // Color primario
    },
    secondary: {
      main: '#424769', // Color secundario
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Fuente de letra predeterminada
    // Puedes definir más configuraciones de tipografía aquí
    body1 : {
        color:'white'
    },
    h3 : {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
          fontSize: '1.8rem',
        }
    },
    h4 : {
      fontSize: '1.1rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      }
    },
  },
  
});

export default theme;
