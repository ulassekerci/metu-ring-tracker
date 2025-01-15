import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

export interface AvgPoint {
  id: number
  lat: string
  lng: string
  address: string
  color: string
  departure: string
  time: string
}

export const fetchAverages = async () => {
  const response = await api.get(`/averages`)
  return response.data as AvgPoint[]
}

export const useAverageData = () => {
  return useQuery({
    queryKey: ['avgdata'],
    queryFn: () => fetchAverages(),
    refetchInterval: 1000,
  })
}
