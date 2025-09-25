import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

export interface Ghost {
  departure: string
  trips: TripPoint[]
  average: TripPoint
}

export interface TripPoint {
  id: string
  point: RingPoint
  departure: string
}

export interface RingPoint {
  lat: number
  lng: number
  address: string
  color: string
  state: string
  plate: string
  serviceTime: number
}

const fetchGhosts = async () => {
  const response = await api.get<Ghost[]>(`/ghosts`)
  return response.data
}

export const useGhostData = () => {
  return useQuery({
    queryKey: ['ghosts'],
    queryFn: () => fetchGhosts(),
    refetchInterval: 1000,
  })
}
