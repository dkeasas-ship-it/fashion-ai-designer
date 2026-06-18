import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export const useProtectedRoute = () => {
  const navigate = useNavigate()
  const { token, user } = useAuthStore()

  useEffect(() => {
    if (!token || !user) {
      navigate('/login')
    }
  }, [token, user, navigate])

  return { isAuthenticated: !!token && !!user }
}