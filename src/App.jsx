import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from './AuthProvider'
import PrivateLayout from './PrivateLayout'
import FirebaseAuthUI from './FirebaseAuthUI'
import Dashboard from "./Dashboard"
import ScheduleSession from "./ScheduleSession"

import { ThemeProvider, CssBaseline } from "@mui/material"
import './App.css'

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path='/login' element={ <FirebaseAuthUI/> }/>
            {/* Wrap private routes in layout route that checks auth status */}
            <Route element={<PrivateLayout/>} >
              <Route exact path='/dashboard' element={ <Dashboard/> }/>
              <Route exact path='/schedule' element={ <ScheduleSession/> }/>
            </Route>
            {/* Redirect all un-known routes to dashboard */}
            <Route path="*" element={ <Navigate to='/dashboard' replace/> }/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App