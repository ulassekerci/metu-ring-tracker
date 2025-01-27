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

const fetchTrips = async (startDate: string, endDate: string) => {
  const response = await api.get<TripData[]>(`/trips?start=${startDate}&end=${endDate}`)
  return response.data
}

const fetchTrip = async (tripID: string) => {
  const response = await api.get<TripData>(`/trips/${tripID}`)
  return response.data
}

export const useTrips = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['trips', startDate, endDate],
    queryFn: () => fetchTrips(startDate, endDate),
  })
}

export const useTrip = (tripID: string) => {
  return useQuery({
    queryKey: ['trip', tripID],
    queryFn: () => fetchTrip(tripID),
  })
}
