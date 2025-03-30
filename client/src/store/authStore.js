import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loginUser, registerUser, logoutUser, getProfile } from '../api/auth'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const { access_token } = await loginUser(email, password)
          const user = await getProfile()
          set({ user, isAuthenticated: true, loading: false })
          return true
        } catch (error) {
          set({ error: error.response?.data?.message || error.message, loading: false })
          return false
        }
      },

      register: async (name, email, password) => {
        set({ loading: true, error: null })
        try {
          await registerUser(name, email, password)
          set({ loading: false })
          return true
        } catch (error) {
          set({ error: error.response?.data?.message || error.message, loading: false })
          return false
        }
      },

      logout: async () => {
        await logoutUser()
        set({ user: null, isAuthenticated: false })
      },

      checkAuth: async () => {
        set({ loading: true })
        try {
          const user = await getProfile()
          set({ user, isAuthenticated: true, loading: false })
          return true
        } catch (error) {
          set({ user: null, isAuthenticated: false, loading: false })
          return false
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore