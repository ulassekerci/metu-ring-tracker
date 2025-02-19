import { api } from '@/lib/queryClient'
import { useQuery } from '@tanstack/react-query'
import { DateTime } from 'luxon'

export interface Schedule {
  color: string
  time: string
  weekend: boolean
}

export const useSchedule = () => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: async () => {
      const response = await api.get<Schedule[]>(`/schedule`)
      return response.data
    },
  })
}

export const getNextTrip = (schedule: Schedule[]) => {
  const isWeekend = DateTime.now().setZone('Europe/Istanbul').minus({ hours: 3 }).isWeekend
  const filteredSchedule = schedule.filter((trip) => trip.weekend === isWeekend)
  const nextTripOfDay = filteredSchedule.find((trip) => {
    const tripTime = DateTime.fromFormat(trip.time, 'HH:mm:ss')
    return tripTime > DateTime.now().minus({ minutes: 1 })
  })
  return nextTripOfDay || filteredSchedule[0]
}

export const getRingNameFromColor = (color: string) => {
  const upperCaseColor = color.toUpperCase()
  switch (upperCaseColor) {
    case '#FF0000':
      return 'Sarı-Kırmızı Ring'
    case '#FFFF57':
      return 'Sarı-Kırmızı Ring'
    case '#9600CD':
      return 'Mor Ring'
    case '#A64D00':
      return 'Kahverengi Ring'
    case '#0000FF':
      return 'Lacivert Ring'
    case '#737373':
      return 'Gri Ring'
    default:
      return upperCaseColor + ' Ring'
  }
}
