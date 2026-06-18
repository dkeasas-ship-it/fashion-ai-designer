import { useState } from 'react'
import { useAuthStore } from '../stores/authStore'

export const useAuth = () => {
  const authStore = useAuthStore()
  const [error, setError] = useState(null)

  const handleRegister = async (userData) => {
    try {
      setError(null)
      await authStore.register(userData)
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const handleLogin = async (credentials) => {
    try {
      setError(null)
      await authStore.login(credentials)
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  return {
    ...authStore,
    error,
    handleRegister,
    handleLogin
  }
}