import { useEffect } from 'react'
import  useAuthStore  from '../store/authStore'
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material'

const Profile = () => {
  const { user, loading, error, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>

        <Card>
          <CardContent>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={user?.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={user?.email} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Member Since"
                  secondary={new Date(user?.createdAt).toLocaleDateString()}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Profile