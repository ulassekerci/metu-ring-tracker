import { RingTrip } from '@/interfaces'
import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'

const fetchLive = async () => {
  const response = await api.get<RingTrip[]>(`/`)
  return response.data
}

export const useLiveData = () => {
  const query = useQuery({
    queryKey: ['live'],
    queryFn: () => fetchLive(),
    refetchInterval: 1000,
  })
  const liveDepartures = new Set<number>()
  query.data?.forEach((trip) => {
    if (!trip.departureTime) return
    liveDepartures.add(trip.departureTime)
  })
  return { ...query, departures: [...liveDepartures.values()] }
}
