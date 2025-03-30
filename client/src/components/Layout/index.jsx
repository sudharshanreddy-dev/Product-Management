import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Container, CssBaseline } from '@mui/material'

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  )
}

export default Layout