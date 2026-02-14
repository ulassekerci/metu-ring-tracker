import { RingTrip } from '@/interfaces'
import { api } from '@/lib/queryClient'
import { ServiceTime } from '@/lib/ServiceTime'
import { medianUpper } from '@/utils/median'
import { useQuery } from '@tanstack/react-query'

const fetchGhosts = async () => {
  const response = await api.get<RingTrip[]>(`/ghosts`)
  return groupGhosts(response.data)
}

const groupGhosts = (ghosts: RingTrip[]) => {
  const departures = new Set<number>()
  ghosts.forEach((ghost) => {
    if (!ghost.departureTime) return
    departures.add(ghost.departureTime)
  })
  return [...departures].map((departure) => {
    const trips = ghosts.filter((trip) => trip.departureTime === departure)
    return {
      trips,
      departure: new ServiceTime(departure),
      average: findAverage(trips),
    }
  })
}

const findAverage = (trips: RingTrip[]) => {
  const traveledDistances: number[] = []
  trips.forEach((trip) => {
    traveledDistances.push(trip.closestPointToNow.distanceTraveled)
  })
  const medianValue = medianUpper(traveledDistances)
  const median = trips.find((trip) => trip.closestPointToNow.distanceTraveled === medianValue)
  return median ?? trips[0]
}

export const useGhostData = () => {
  return useQuery({
    queryKey: ['ghosts'],
    queryFn: () => fetchGhosts(),
    refetchInterval: 1000,
  })
}
