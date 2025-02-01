import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

export interface LiveData {
  data: LivePoint[] | null
  timestamp: string | null // null only on local (crawler disabled)
  vehicles: LiveVehicle[]
}

export interface LivePoint {
  lat: string // latitude
  lng: string // longitude
  addr: string // address
  dir: number // direction (0-8, one per 45 degrees)
  sp: string // speed
  clr: string // color
  ago: number // data age
  key: string // state
  id: string // license plate
}

export interface LiveVehicle {
  tripID: string
  plate: string
  color: string
  state: string
  departure: string | null
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
