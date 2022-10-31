import React from 'react'

import MyRoutes from './router/routes'
import { AuthContext } from './context/authContext'
import { ThemeContext } from './context/themeContext'
import { createTheme } from '@mui/material/styles'

import './App.css'

const initialState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  user: localStorage.getItem('mcb_auth')
    ? JSON.parse(localStorage.getItem('mcb_auth'))
    : null,
  token: localStorage.getItem('token') || null,
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('mcb_auth', JSON.stringify(action.payload.user))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

const theme = createTheme()

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <ThemeContext.Provider value={theme}>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <MyRoutes />
      </AuthContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
