import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from './AuthProvider'
import PrivateLayout from './PrivateLayout'
import Dashboard from "./Dashboard"
import FirebaseAuthUI from './FirebaseAuthUI'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path='/login' element={ <FirebaseAuthUI/> }/>
          {/* Wrap private routes in layout route that checks auth status */}
          <Route element={<PrivateLayout/>} >
            <Route exact path='/dashboard' element={ <Dashboard/> }/>
          </Route>
          {/* Redirect all un-known routes to dashboard */}
          <Route path="*" element={ <Navigate to='/dashboard' replace/> }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App