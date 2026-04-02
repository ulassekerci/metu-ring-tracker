import { QueryClient } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'

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
})

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
