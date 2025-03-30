import { Box, Typography, Container } from '@mui/material'

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Product Management App
        </Typography>
        <Typography variant="h5" component="h2">
          Manage your products with ease
        </Typography>
      </Box>
    </Container>
  )
}

export default Home