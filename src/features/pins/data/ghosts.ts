import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

export interface RingLog {
  id: number
  trip_id: string
  lat: string
  lng: string
  address: string
  color: string
  state: string
  plate: string
  timestamp: string
}

export interface RingLogWithDeparture extends RingLog {
  departure: string // HH:mm:ss
}

export interface MiddlePoint extends RingLogWithDeparture {
  maxDistance: number
}

export interface tripsWithMiddlePoints {
  departure: string
  middlePoint: MiddlePoint
  trips: RingLogWithDeparture[]
}

const fetchGhosts = async () => {
  const response = await api.get<tripsWithMiddlePoints[]>(`/ghosts`)
  return response.data
}

export const useGhostData = () => {
  return useQuery({
    queryKey: ['ghosts'],
    queryFn: () => fetchGhosts(),
    refetchInterval: 1000,
  })
}
