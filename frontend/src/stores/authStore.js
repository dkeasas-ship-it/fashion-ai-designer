import { create } from 'zustand'
import { authService } from '../services/api'

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token })
  },
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),

  register: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.register(userData)
      set({
        user: response.user,
        token: response.token,
        isLoading: false
      })
      localStorage.setItem('token', response.token)
      return response
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.login(credentials)
      set({
        user: response.user,
        token: response.token,
        isLoading: false
      })
      localStorage.setItem('token', response.token)
      return response
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  }
}))