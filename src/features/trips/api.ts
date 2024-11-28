import { api } from '@/lib/queryClient'

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

export const deleteTrip = async (tripID: string) => {
  await api.delete(`/trips/${tripID}`)
}

export const deleteTrips = async (tripIDs?: string[]) => {
  if (!tripIDs) return
  return Promise.all(tripIDs.map((tripID) => deleteTrip(tripID)))
}
