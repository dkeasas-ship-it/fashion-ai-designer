import { create } from 'zustand'
import { designService, aiService, agentService } from '../services/api'

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
      const delegationResponse = await aiService.generateDesign({ designId, prompt })
      const { taskId } = delegationResponse

      const taskResponse = await new Promise((resolve, reject) => {
        let stopPolling = () => {}

        stopPolling = agentService.pollTaskStatus(taskId, (statusResponse) => {
          const task = statusResponse?.task

          if (!task) {
            return
          }

          if (task.status === 'completed') {
            stopPolling()
            resolve(statusResponse)
          }

          if (task.status === 'failed') {
            stopPolling()
            reject(new Error(task.error || 'AI generation failed'))
          }
        })
      })

      const generatedDesign = taskResponse.task?.result?.design || null

      set((state) => ({
        designs: generatedDesign
          ? state.designs.some((design) => design._id === generatedDesign._id)
            ? state.designs.map((design) => design._id === generatedDesign._id ? generatedDesign : design)
            : [...state.designs, generatedDesign]
          : state.designs,
        currentDesign: generatedDesign || state.currentDesign,
        isLoading: false
      }))

      return {
        taskId,
        ...taskResponse.task?.result
      }
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