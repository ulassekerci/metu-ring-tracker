import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'
import { DateTime } from 'luxon'

export interface AvgPoint {
  id: number
  lat: string
  lng: string
  address: string
  color: string
  departure: string
  time: string
}

export const fetchAverages = async () => {
  const response = await api.get(`/averages`)
  return response.data as AvgPoint[]
}

export const useAverageData = () => {
  return useQuery({
    queryKey: ['avgdata'],
    queryFn: () => fetchAverages(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export const getGhostLocations = (avgData: AvgPoint[]) => {
  const ghostPoints: AvgPoint[] = []
  const departures = new Set(avgData.map((point) => point.departure))
  departures.forEach((departure) => {
    const points = avgData.filter((point) => point.departure === departure)
    // find closest point in time to now
    const closestPoint = points.reduce((prev, current) => {
      const prevTime = DateTime.fromISO(prev.time, { zone: 'Europe/Istanbul' })
      const currentTime = DateTime.fromISO(current.time, { zone: 'Europe/Istanbul' })
      const prevDiff = Math.abs(prevTime.diffNow('seconds').seconds)
      const currentDiff = Math.abs(currentTime.diffNow('seconds').seconds)
      return prevDiff < currentDiff ? prev : current
    })
    ghostPoints.push(closestPoint)
  })
  return ghostPoints
}