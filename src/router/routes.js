import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TransactionsList from '../components/listTransactions'
import NewTransaction from '../components/newTransaction'
import AppLayout from '../pages/appLayout'
import Dashboard from '../pages/dashboard'
import Home from '../pages/home'
import Login from '../pages/login'
import { ProtectedRoute } from './protectedRoutes'

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route
            exact
            path="/new"
            element={
              <ProtectedRoute>
                <NewTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/list"
            element={
              <ProtectedRoute>
                <TransactionsList />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default MyRoutes
