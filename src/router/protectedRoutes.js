import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export const ProtectedRoute = ({ children }) => {
  const { state: authState } = React.useContext(AuthContext)
  if (!authState?.user?.id) {
    // user is not authenticated
    return <Navigate to="/login" />
  }
  return children
}
