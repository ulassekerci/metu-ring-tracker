import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

export interface LiveData {
  data: LivePoint[] | null
  timestamp: string | null // null only on local (crawler disabled)
  vehicles: LiveVehicle[]
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

export interface LiveVehicle {
  tripID: string
  plate: string
  color: string
  state: string
  departure: string | null
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
