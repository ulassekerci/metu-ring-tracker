import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

export interface LiveData {
  data: LivePoint[]
  timestamp: string
}

export interface LivePoint {
  lat: string
  lng: string
  addr: string
  dir: number
  sp: string
  clr: string
  ago: number
  key: string
  id: string
}

const fetchLive = async () => {
  const response = await api.get(`/`)
  return response.data as LiveData
}

export const useLiveData = () => {
  return useQuery({
    queryKey: ['livedata'],
    queryFn: () => fetchLive(),
    refetchInterval: 1000,
  })
}