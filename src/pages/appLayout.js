import * as React from 'react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Badge from '@mui/material/Badge'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListIcon from '@mui/icons-material/List'

import { AccountCircleOutlined, LogoutOutlined } from '@mui/icons-material'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import { AuthContext } from '../context/authContext'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

function AppLayout() {
  const { state: authState, dispatch } = React.useContext(AuthContext)

  const [open, setOpen] = React.useState(false)

  const navigate = useNavigate()

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    })
    navigate('/login')
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              MCB
            </Typography>
            {authState?.user?.id ? (
              <nav>
                <Link
                  variant="button"
                  color="text.primary"
                  onClick={() => navigate('/new')}
                  sx={{ my: 1, mx: 2, cursor: 'pointer !important' }}
                  underline="none"
                >
                  New Transaction
                </Link>

                <Link
                  variant="button"
                  color="text.primary"
                  onClick={() => navigate('/list')}
                  sx={{ my: 1, mx: 2, cursor: 'pointer !important' }}
                  underline="none"
                >
                  View Transactions
                </Link>

                <Tooltip title="User Profile">
                  <IconButton
                    color="inherit"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Badge color="secondary">
                      <AccountCircleOutlined />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Logout">
                  <IconButton color="inherit" onClick={logout}>
                    <Badge color="secondary">
                      <LogoutOutlined />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </nav>
            ) : (
              <Tooltip title="Login">
                <IconButton color="inherit" onClick={() => navigate('/login')}>
                  <Badge color="secondary">
                    <AccountCircleOutlined />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton onClick={() => navigate('/dashboard')}>
              <Tooltip title="Dashboard">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/list')}>
              <Tooltip title="View Transactions">
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Transactions" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <div sx={{ pt: 4 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {'MCB Assignment '}
                    <Link color="inherit" href="#">
                      Github
                    </Link>{' '}
                    {new Date().getFullYear()}
                  </Typography>
                </div>
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default AppLayout
