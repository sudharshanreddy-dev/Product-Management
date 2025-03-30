import api from './index'

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/signin', { email, password })
  return response.data
}

export const registerUser = async (name, email, password) => {
  const response = await api.post('/auth/signup', { name, email, password })
  return response.data
}

export const logoutUser = async () => {
  const response = await api.post('/auth/logout')
  return response.data
}

export const getProfile = async () => {
  const response = await api.get('/users/profile')
  return response.data
}