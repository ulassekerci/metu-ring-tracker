import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

export interface LiveData {
  data: LiveVehicle[] | null
  timestamp: string | null
}

export interface LiveVehicle {
  plate: string
  color: string
  trip: RingTrip
  brand: string
  model: string
  doors: number
}

interface RingTrip {
  id: string
  line: Line
  points: Point[]
  vehiclePlate: string
  departureTime: string
  isPartial: boolean
}

interface Line {
  name: string
  departures: string[]
  weekend: boolean
  sections: Section[]
  colors: string[]
}

interface Section {
  name: string
  color: string
  polyline: Polyline
  stops: Stop[]
}

export interface Polyline {
  type: string
  properties: {
    name: string
  }
  geometry: {
    type: string
    coordinates: number[][]
  }
}

interface Stop {
  stop: {
    name: string
    lat: number
    lng: number
    address?: string
  }
  mins: number
}

interface Point {
  lat: number
  lng: number
  address: string
  color: string
  state: string
  plate: string
  serviceTime: number
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
