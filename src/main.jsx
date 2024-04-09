import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router/AppRouter.jsx'
import {AuthContextProvider} from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <React.StrictMode>
      <AppRouter/>
    </React.StrictMode>
  </AuthContextProvider>
  
)
