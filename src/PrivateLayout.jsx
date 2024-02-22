import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./AuthProvider"

const PrivateLayout = () => {
  const { currentUser } = useAuth();
  let location = useLocation()
  return currentUser ? <Outlet /> : <Navigate to='/login' state={{from: location}} replace />
}

export default PrivateLayout