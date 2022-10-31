import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { Alert, AlertTitle, CircularProgress, Tooltip } from '@mui/material'
import { HelpOutline } from '@mui/icons-material'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth'

export default function SignIn() {
  const { dispatch } = React.useContext(AuthContext)

  const navigate = useNavigate()

  const [formData, setFormData] = React.useState(null)
  const [formError, setFormError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const validateEmail = (value) => {
    if (!value) {
      setFormError({ ...formError, email: 'Email is required' })
      return false
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      setFormError({ ...formError, email: 'Email is not valid' })
      return false
    }
    setFormError({ ...formError, email: null })
    return true
  }

  const validatePassword = (value) => {
    if (!value) {
      setFormError({ ...formError, password: 'Password is required' })
      return false
    }
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)) {
      setFormError({ ...formError, password: 'Password is not valid' })
      return false
    }
    setFormError({ ...formError, password: null })
    return true
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    if (name === 'email') validateEmail(value)
    else validatePassword(value)
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    if (validateEmail && validatePassword) {
      const response = await login(formData)
      if (response.data && response.status === 200) {
        dispatch({
          type: 'LOGIN',
          payload: {
            token: response.data.token,
            user: response.data.user,
          },
        })
        setLoading(false)
        setError(null)
        navigate('/dashboard')
      } else {
        setError(response.error)
      }
    }
    setLoading(false)
  }

  return (
    <Grid container component="main" sx={{ height: '80vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={7}
        component={Paper}
        elevation={6}
        square
        sx={{ bgcolor: 'grey.200' }}
      >
        <Box
          sx={{
            my: 8,
            mx: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '80%',
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: 'primary.main' }}
          >
            Sign in with MCB
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          {loading && (
            <CircularProgress
              size={48}
              sx={{
                color: 'info',
                position: 'absolute',
                top: '50%',
                left: '45%',
              }}
            />
          )}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              width: '100%',
              opacity: loading ? 0.5 : 1,
              pointerEvents: loading ? 'none' : 'initial',
            }}
          >
            {error && (
              <Alert severity="error">
                <AlertTitle>Error while trying to login</AlertTitle>
                <strong>{error}</strong>
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              //fullWidth
              sx={{ width: '92%' }}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData?.email}
              onChange={handleChange}
              error={formError?.email}
              helperText={formError?.email}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData?.password}
                onChange={handleChange}
                error={formError?.password}
                helperText={formError?.password}
              />
              <Tooltip title="Password should be 6 to 16 Characters long, should contain at least one Uppercase letter, lowercase letter, special character and digit">
                <HelpOutline sx={{ ml: 2, color: 'grey.600' }} />
              </Tooltip>
            </Box>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/MCB.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  )
}
