import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

export interface TripData {
  tripID: string
  departure: string
  duration: number
  plate: string
  points: RingPoint[]
}

interface RingPoint {
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

export const fetchTrips = async () => {
  const response = await api.get('/trips')
  return response.data as TripData[]
}

export const fetchTrip = async (tripID: string) => {
  const response = await api.get(`/trips/${tripID}`)
  return response.data as TripData
}

export const useTrips = () => {
  return useQuery({
    queryKey: ['trips'],
    queryFn: fetchTrips,
  })
}

export const useTrip = (tripID: string) => {
  return useQuery({
    queryKey: ['trip', tripID],
    queryFn: () => fetchTrip(tripID),
  })
}
