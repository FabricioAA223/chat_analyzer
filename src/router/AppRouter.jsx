import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/Main/Homepage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { AuthContext } from '../context/AuthContext';
import TemporaryDrawer from '../pages/Main/components/TemporaryDrawer';
import NewAnalysis from '../pages/NewAnalysis';
import AnalysisInProcess from '../pages/AnalysisInProcess';
import AnalysisFinished from '../pages/Analysis finished/AnalysisFinished';
import Inbox from '../pages/Inbox';

function AppRouter() { 
  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
        return <Navigate to={'/login'}/>
    }
     return <><TemporaryDrawer />{children}</>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute> } 
          />
          <Route path='/new_analysis' element={
            <ProtectedRoute>
              <NewAnalysis />
            </ProtectedRoute> } 
          />
          <Route path='/processing_analysis' element={
            <ProtectedRoute>
              <AnalysisInProcess />
            </ProtectedRoute> } 
          />
          <Route path='/analysis_finished' element={
            <ProtectedRoute>
              <AnalysisFinished />
            </ProtectedRoute> } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter