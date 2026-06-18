import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

export const useNotification = () => {
  const { t } = useTranslation()

  return {
    success: (message) => {
      toast.success(message || t('messages.success'))
    },
    error: (message) => {
      toast.error(message || t('messages.error'))
    },
    loading: (message) => {
      return toast.loading(message || t('messages.loading'))
    },
    dismiss: (toastId) => {
      toast.dismiss(toastId)
    }
  }
}