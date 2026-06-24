import { apiClient } from './api'

const terminalStatuses = ['completed', 'failed']

export const agentService = {
  delegateTask: (type, payload, designId = null) => apiClient.post('/agent/delegate', {
    type,
    payload,
    designId
  }),

  getTaskStatus: (taskId) => apiClient.get(`/agent/tasks/${taskId}`),

  listTasks: () => apiClient.get('/agent/tasks'),

  pollTaskStatus: (taskId, onUpdate, intervalMs = 2000) => {
    let stopped = false
    let timerId = null
    let lastStatus = null

    const notifyFailure = (error) => {
      const failureState = {
        success: false,
        task: {
          taskId,
          status: 'failed',
          error: error.message || 'Task polling failed'
        }
      }
      onUpdate?.(failureState)
    }

    const poll = async () => {
      if (stopped) {
        return
      }

      const response = await agentService.getTaskStatus(taskId)
      const currentStatus = response?.task?.status

      if (currentStatus !== lastStatus || lastStatus === null) {
        lastStatus = currentStatus
        onUpdate?.(response)
      }

      if (terminalStatuses.includes(currentStatus)) {
        stopped = true
        if (timerId) {
          clearInterval(timerId)
        }
      }
    }

    void poll().catch((error) => {
      stopped = true
      if (timerId) {
        clearInterval(timerId)
      }
      notifyFailure(error)
    })

    timerId = globalThis.setInterval(() => {
      void poll().catch((error) => {
        stopped = true
        if (timerId) {
          clearInterval(timerId)
        }
        notifyFailure(error)
      })
    }, intervalMs)

    return () => {
      stopped = true
      if (timerId) {
        clearInterval(timerId)
      }
    }
  }
}

export default agentService
