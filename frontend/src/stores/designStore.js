import { create } from 'zustand'
import { designService, aiService } from '../services/api'

export const useDesignStore = create((set) => ({
  designs: [],
  currentDesign: null,
  isLoading: false,
  error: null,

  setDesigns: (designs) => set({ designs }),
  setCurrentDesign: (design) => set({ currentDesign: design }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),

  fetchDesigns: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await designService.getDesigns()
      set({ designs: response.designs, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  createDesign: async (designData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await designService.createDesign(designData)
      set((state) => ({
        designs: [...state.designs, response.design],
        currentDesign: response.design,
        isLoading: false
      }))
      return response.design
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  generateDesignWithAI: async (designId, prompt) => {
    set({ isLoading: true, error: null })
    try {
      const response = await aiService.generateDesign({ designId, prompt })
      set({ currentDesign: response.design, isLoading: false })
      return response
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  updateDesign: async (designId, data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await designService.updateDesign(designId, data)
      set((state) => ({
        designs: state.designs.map((d) => d._id === designId ? response.design : d),
        currentDesign: response.design,
        isLoading: false
      }))
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  deleteDesign: async (designId) => {
    set({ isLoading: true, error: null })
    try {
      await designService.deleteDesign(designId)
      set((state) => ({
        designs: state.designs.filter((d) => d._id !== designId),
        isLoading: false
      }))
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  }
}))