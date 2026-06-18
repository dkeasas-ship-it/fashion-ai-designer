import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle responses
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error.response?.data || error)
  }
)

// Auth Services
export const authService = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: (token) => apiClient.post('/auth/refresh', { token })
}

// User Services
export const userService = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.put('/users/profile', data),
  saveMeasurements: (data) => apiClient.post('/users/measurements', data)
}

// Design Services
export const designService = {
  createDesign: (data) => apiClient.post('/designs', data),
  getDesigns: () => apiClient.get('/designs'),
  getDesignById: (id) => apiClient.get(`/designs/${id}`),
  updateDesign: (id, data) => apiClient.put(`/designs/${id}`, data),
  deleteDesign: (id) => apiClient.delete(`/designs/${id}`)
}

// AI Services
export const aiService = {
  generateDesign: (data) => apiClient.post('/ai/generate-design', data)
}

// AR Services
export const arService = {
  tryOn: (data) => apiClient.post('/ar/try-on', data),
  getARTryOns: (designId) => apiClient.get(`/ar/try-ons/${designId}`)
}

// Order Services
export const orderService = {
  createOrder: (data) => apiClient.post('/orders', data),
  getOrders: () => apiClient.get('/orders'),
  getOrderById: (id) => apiClient.get(`/orders/${id}`),
  updateOrderStatus: (id, data) => apiClient.put(`/orders/${id}/status`, data)
}

export default apiClient