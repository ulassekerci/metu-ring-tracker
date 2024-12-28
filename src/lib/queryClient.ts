import { QueryCache, QueryClient } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const maxRetries = 4
const disableRetryCodes = [400, 401, 403, 404]

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (failureCount > maxRetries) return false
        if (isAxiosError(error) && disableRetryCodes.includes(error.response?.status ?? 0)) return false
        return true
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (!isAxiosError(error)) return
      const status = error.response?.status
      const message = error.response?.data?.message || error.response?.data
      if (status === 401) {
        Cookies.remove('token')
        window.location.href = '/login'
      } else {
        toast.error(message)
      }
    },
  }),
})

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
