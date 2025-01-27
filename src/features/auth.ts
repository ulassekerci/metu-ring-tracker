import { api } from '@/lib/queryClient'

export const authUser = async (input: { email: string; password: string }) => {
  const response = await api.post<{ token: string }>('/auth/login', input)
  return response.data.token
}
