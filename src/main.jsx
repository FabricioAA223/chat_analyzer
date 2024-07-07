import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router/AppRouter.jsx'
import {AuthContextProvider} from './context/AuthContext';
import './styles.css'
import { ThemeProvider } from '@mui/material';
import theme from './theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <AppRouter/>
      </ThemeProvider>
    </React.StrictMode>
  </AuthContextProvider>
  
)
