import { Button, Container, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="primary.main"
            gutterBottom
          >
            MCB Bank
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" onClick={() => navigate('/new')}>
              Create New Transaction
            </Button>
            <Button variant="outlined" onClick={() => navigate('/list')}>
              View Transaction List
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Dashboard
