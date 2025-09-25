import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

export interface LiveData {
  data: LivePoint[] | null
  timestamp: string | null
  vehicles: LiveVehicle[]
}

export interface LivePoint {
  lat: number
  lng: number
  address: string
  color: string
  state: string
  plate: string
  serviceTime: number
}

export interface LiveVehicle {
  plate: string
  info: VehicleInfo | null
}

interface VehicleInfo {
  plate: string
  doors: number
  brand: string
  model: string
}

const fetchLive = async () => {
  const response = await api.get<LiveData>(`/`)
  return response.data
}

export const useLiveData = () => {
  return useQuery({
    queryKey: ['live'],
    queryFn: () => fetchLive(),
    refetchInterval: 1000,
  })
}
